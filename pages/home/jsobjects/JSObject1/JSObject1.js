export default {
	async carregar() {
		const resultado = await getPermissoes.run();

		if (!resultado || !resultado[0]) {
			showAlert("Matrícula não encontrada ou sem permissões configuradas.", "error");
			return { erro: "Nenhuma permissão encontrada" };
		}

		const p = resultado[0];

		// Preenche todas as permissões no store global
		await storeValue("add_veiculo", p.adicionar_veiculo);
		await storeValue("permissao_query", p.controle_query);
		await storeValue("lançar_abastecimento", p.permissao_abastecimento_mf);
		await storeValue("atualizar_intercorrencia", p.permissao_intercorrencias);
		await storeValue("modulo_mf", p.permissao_modulo_mf);
		await storeValue("ver_abastecimento", p.permissao_ver_abastecimentos);
		await storeValue("lancar_pagamento", p.permissao_lanca_pagamento);

		// Retorno de DEBUG
		return {
			matricula: appsmith.store.matricula,
			adicionar_veiculo: p.adicionar_veiculo,
			controle_query: p.controle_query,
			permissao_abastecimento_mf: p.permissao_abastecimento_mf,
			permissao_intercorrencias: p.permissao_intercorrencias,
			permissao_modulo_mf: p.permissao_modulo_mf,
			permissao_ver_abastecimentos: p.permissao_ver_abastecimentos,
			permissao_lanca_pagamento: p.permissao_lanca_pagamento
		};
	}
};
