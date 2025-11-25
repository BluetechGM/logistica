export default {
	async carregar() {
		const resultado = await getPermissoes.run();

		if (!resultado || !resultado[0]) {
			showAlert("Matrícula não encontrada ou sem permissões configuradas.", "error");
			return false;
		}

		const p = resultado[0];

		// Preenche todas as permissões no store global
		storeValue("add_veiculo", p.adicionar_veiculo);
		storeValue("permissao_query", p.controle_query);
		storeValue("lançar_abastecimento", p.permissao_abastecimento_mf);
		storeValue("atualizar_intercorrencia", p.permissao_intercorrencias);
		storeValue("modulo_mf", p.permissao_modulo_mf);
		storeValue("ver_abastecimento", p.permissao_ver_abastecimentos);
		storeValue("lancar_pagamento", p.permissao_lanca_pagamento);
		storeValue("permissao", p.permissao_editar_mf);

		return true;
	}
};
