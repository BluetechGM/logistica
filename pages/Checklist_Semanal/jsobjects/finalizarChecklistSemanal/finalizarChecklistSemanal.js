export default {
	finalizarChecklistSemanal: async () => {
		try {
			/* =====================================================
			 * 1️⃣ CONTEXTO DO CHECKLIST
			 * ===================================================== */
			const ctx = appsmith.store.checklist_semanal_contexto;
			if (
				!ctx ||
				!ctx.filial_id ||
				!ctx.placa ||
				!ctx.usuario_execucao ||
				!Number.isInteger(ctx.odometro)
			) {
				showAlert(
					"Preencha Cidade, Placa, Usuário e Odômetro antes de finalizar.",
					"warning"
				);
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
			const itensStore = Object.fromEntries(
				Object.entries(itensStoreRaw).filter(
					([key, value]) =>
						key !== "checklist_semanal_itens" &&
						typeof value === "object" &&
						["CONFORME", "REGULAR", "NAO_CONFORME"].includes(value?.status)
				)
			);

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
			const headerResult = await insert_checklist_semanal_motos.run({
				filial_id: ctx.filial_id,
				placa: ctx.placa,
				usuario_execucao: ctx.usuario_execucao,
				odometro: ctx.odometro,
				resultado_final: resultadoFinal,
				observacoes: observacoes_checklist?.text || ""
			});
			const idChecklist = headerResult?.[0]?.id_checklist;
			if (!idChecklist) {
				throw new Error("Falha ao obter o ID do checklist semanal.");
			}

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