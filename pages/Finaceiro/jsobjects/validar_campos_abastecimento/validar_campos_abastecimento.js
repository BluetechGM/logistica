export default {
    validateAndRun: async () => {
        // Verifica se a foto do PIX foi enviada
        if (!foto_url_pix_abastecimento.data || !foto_url_pix_abastecimento.data.secure_url) {
            showAlert("Faça upload da foto do PIX antes de lançar o abastecimento", "error");
            return;
        }

        // Lista de erros de validação
        const errors = [];

        if (!Select_placa_abas.selectedOptionLabel) 
            errors.push("Placa é obrigatória");
        
        if (!Select_Cidade_abas.selectedOptionLabel) 
            errors.push("Cidade é obrigatória");
        
        if (!Select_Cidade_abas.selectedOptionValue) 
            errors.push("Filial é obrigatória");
        
        if (!Input_OdometroAtual_abast.text) 
            errors.push("Odômetro atual é obrigatório");
        
        if (!Input_valor_abastecimento.text) 
            errors.push("Valor do abastecimento é obrigatório");
        
        if (!litros_abastecidos.text) 
            errors.push("Litros abastecidos são obrigatórios");
        
        if (!Select_posto_abas.selectedOptionLabel) 
            errors.push("Posto de abastecimento é obrigatório");
        
        if (!Select_posto_abas.selectedOptionValue) 
            errors.push("Código do fornecedor é obrigatório");
        
        if (!Select_condutor_abas.selectedOptionLabel) 
            errors.push("Condutor é obrigatório");
        
        if (!Select_condutor_abas.selectedOptionValue) 
            errors.push("Matrícula do condutor é obrigatória");
        
        if (!appsmith.store.usuario_nome) 
            errors.push("Usuário que lançou é obrigatório");
			  

        // Se houver erros, exibe alerta e interrompe
        if (errors.length > 0) {
            showAlert("Erro: " + errors.join(", "), "error");
            return;
        }

        // Tudo ok: executa a query de lançamento do abastecimento
        try {
            await lancar_abastecimento.run();
            showAlert("Abastecimento lançado com sucesso!", "success");
					  await solicitar_absatecimento_financ.run();
					  resetWidget("abastecimento");
            closeModal("abastecimento");
					  lista_de_abastecimento.run();
					  
            
            // Opcional: atualizar a lista de abastecimentos
            // listar_abastecimentos.run();
        } catch (err) {
            showAlert("Erro ao lançar abastecimento: " + (err?.message || err), "error");
        }
    }
};

