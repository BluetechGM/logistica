export default {
	myVar1: [],
	myVar2: {},

	async processarDecisao() {
		// Executa a IA
		await decisao_rapida_ia.run();

		let decisao = "";

		// Tenta ler o JSON da IA com segurança
		try {
			decisao = JSON.parse(decisao_rapida_ia.data.choices[0].message.content).Decisão;
		} catch (e) {
			showAlert("Erro ao interpretar resposta da IA.", "error");
			return;
		}

		// Se for reprovado
		if (decisao === "Reprovado") {
			showAlert("Reprovado pela IA", "error");
			showModal("Modal2_ia");
			return;
		}

		 // Se aprovado → valida antes de cadastrar
		await validar_campos.validarCampos();
		solicitacoes_frota_list.run();
	}
}
