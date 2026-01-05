export default {
	finalizarChecklistSemanal: async () => {
		try {
			/* =====================================================
			 * 1️⃣ CONTEXTO DO CHECKLIST - VALIDAÇÃO DOS WIDGETS
			 * ===================================================== */
		
		// A query SQL usa os widgets diretamente, então validamos eles
		if (!Select_Cidade_abasCopy.selectedOptionValue) {
			showAlert("⚠️ Selecione a Cidade antes de finalizar.", "warning");
			return;
		}
		
		if (!Select_placa_abasCopy.selectedOptionLabel) {
			showAlert("⚠️ Selecione a Placa antes de finalizar.", "warning");
			return;
		}
		
		if (!Input_odometro.text || isNaN(Number(Input_odometro.text))) {
			showAlert("⚠️ Informe um Odômetro válido antes de finalizar.", "warning");
			return;
		}
		
		if (!appsmith.store.usuario_nome) {
			showAlert("⚠️ Usuário não identificado. Faça login novamente.", "warning");
			return;
		}

			/* =====================================================
			 * 2️⃣ CATÁLOGO DE ITENS (SEMANAL)
			 * ===================================================== */
			if (!catalogo_itens.data || catalogo_itens.data.length === 0) {
				await catalogo_itens.run();
			}
			const itensCatalogo =
				catalogo_itens.data?.filter(
					(i) => i.tipo_checklist === "SEMANAL" && i.ativo === true
				) || [];
			if (itensCatalogo.length === 0) {
				showAlert("Nenhum item ativo no catálogo semanal.", "error");
				return;
			}

			/* =====================================================
			 * 3️⃣ ITENS AVALIADOS (SANITIZAÇÃO DO STORE)
			 * ===================================================== */
			const itensStoreRaw = appsmith.store.checklist_semanal_itens || {};
			console.log("🔍 Store RAW antes da sanitização:", itensStoreRaw);
			console.log("🔍 Chaves do store RAW:", Object.keys(itensStoreRaw));
			const itensStore = Object.fromEntries(
				Object.entries(itensStoreRaw).filter(
					([key, value]) => {
						const isValid =
							key !== "checklist_semanal_itens" &&
							typeof value === "object" &&
							["CONFORME", "REGULAR", "NAO_CONFORME"].includes(value?.status);
						console.log(`🔍 Item "${key}": ${isValid ? "✅ VÁLIDO" : "❌ FILTRADO"}`);
						return isValid;
					}
				)
			);
			console.log("✅ Store SANITIZADO:", itensStore);
			console.log("✅ Itens válidos encontrados:", Object.keys(itensStore));

			/* =====================================================
			 * 4️⃣ VALIDAÇÃO DE ITENS NÃO AVALIADOS
			 * ===================================================== */
			const itensNaoAvaliados = itensCatalogo.filter(
				(item) => !itensStore[item.codigo]
			);
			if (itensNaoAvaliados.length > 0) {
				showAlert(
					`⚠️ Existem ${itensNaoAvaliados.length} item(ns) do checklist semanal não avaliados.`,
					"warning"
				);
				console.warn(
					"Itens não avaliados:",
					itensNaoAvaliados.map((i) => i.codigo)
				);
				return;
			}

			/* =====================================================
			 * 5️⃣ RESULTADO FINAL
			 * ===================================================== */
			const resultadoFinal = Object.values(itensStore).some(
				(item) => item.status === "NAO_CONFORME"
			)
				? "NAO_APTO"
				: "APTO";

			/* =====================================================
			 * 6️⃣ INSERÇÃO DO CHECKLIST (HEADER)
			 * ===================================================== */
			const headerResult = await insert_checklist_semanal_motos.run();
			console.log("🔍 DEBUG - Resultado da inserção:", headerResult);
			const idChecklist = headerResult?.[0]?.id_checklist;
			if (!idChecklist) {
				console.error("❌ Estrutura do resultado:", headerResult);
				throw new Error(`Falha ao obter o ID do checklist. Verifique o console.`);
			}
			console.log("✅ ID do checklist obtido:", idChecklist);

			/* =====================================================
			 * 7️⃣ INSERÇÃO DOS ITENS DO CHECKLIST
			 * ===================================================== */
			for (const [codigo, dados] of Object.entries(itensStore)) {
				await insert_checklist_semanal_itens.run({
					id_checklist: idChecklist,
					item_codigo: codigo,
					status: dados.status,
					fotos: JSON.stringify(dados.fotos || [])
				});
			}

			/* =====================================================
			 * 8️⃣ SUCESSO
			 * ===================================================== */
			showAlert("✅ Checklist semanal finalizado com sucesso!", "success");

			/* =====================================================
			 * 9️⃣ RESET DE ESTADO E UI
			 * ===================================================== */
			removeValue("checklist_semanal_contexto");
			removeValue("checklist_semanal_itens");
			resetWidget("Select_Cidade", true);
			resetWidget("Select_condutor", true);
			resetWidget("Select_placa", true);
			resetWidget("Input_odometro", true);
			resetWidget("observacoes_semanal", true);
			closeModal("modal_checklist_semanal");
		} catch (error) {
			console.error("❌ ERRO AO FINALIZAR CHECKLIST SEMANAL:", error);
			showAlert(
				error?.message || "Erro inesperado ao finalizar o checklist semanal.",
				"error"
			);
		}
	}
};