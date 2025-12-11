export default {
	async processarDecisao() {
		// 1️⃣ Validação dos campos PRIMEIRO
		const valido = validar_campos.validarCampos();
		if (!valido) return;

		// 2️⃣ Executa a IA
		await decisao_rapida_ia.run();

		let decisao = "";

		try {
			decisao = JSON.parse(decisao_rapida_ia.data.choices[0].message.content).Decisão;
		} catch (e) {
			showAlert("Erro ao interpretar resposta da IA.", "error");
			return;
		}

		// 3️⃣ Se IA reprovou, apenas exibe sugestão (não bloqueia)
		if (decisao === "Reprovado") {
			showAlert("⚠️ Sugestão da IA: Reprovação recomendada", "warning");
		}

		// 4️⃣ Salva no banco
		await validar_campos.salvarSolicitacao();

		// 5️⃣ Atualiza a lista
		await solicitacoes_frota_list.run();
	}
}