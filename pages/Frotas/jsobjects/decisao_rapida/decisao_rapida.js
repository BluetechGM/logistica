export default {
	async processarDecisao() {
		// Executa a IA
		await decisao_rapida_ia.run();

		let decisao = "";

		try {
			decisao = JSON.parse(decisao_rapida_ia.data.choices[0].message.content).Decisão;
		} catch (e) {
			showAlert("Erro ao interpretar resposta da IA.", "error");
			return;
		}

		// IA apenas alerta
		if (decisao === "Reprovado") {
			showAlert("⚠️ A IA sugeriu reprovação", "warning");
			showModal("Modal2_ia");
		}

		// Validação real dos campos
		const valido = validar_campos.validarCampos();
		if (!valido) return;

		// Salva no banco
		await validar_campos.salvarSolicitacao();

		// Atualiza a lista após salvar
		await solicitacoes_frota_list.run();
	}
}
