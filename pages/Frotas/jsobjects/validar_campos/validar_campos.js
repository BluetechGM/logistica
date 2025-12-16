export default {
	validarCampos() {
		const mensagens = [];

		if (!Select_placa?.selectedOptionLabel) {
			mensagens.push("⚠️ Placa não informada");
		}

		if (!foto_orcamento_pdf_ou_imagem?.data?.secure_url) {
			mensagens.push("⚠️ Você precisa anexar o PDF ou imagem do Orçamento");
		}

		if (!upload_fotos?.urls || upload_fotos.urls.length === 0) {
			mensagens.push("⚠️ Você precisa anexar pelo menos uma foto");
		}

		if (!foto_orcamento_video?.data?.secure_url) {
			mensagens.push("⚠️ Você precisa anexar o vídeo");
		}

		if (!Input_OdometroAtual?.text || isNaN(Number(Input_OdometroAtual.text))) {
			mensagens.push("⚠️ Odômetro atual inválido ou não informado");
		}

		if (!Select_Cidade?.selectedOptionLabel) {
			mensagens.push("⚠️ Cidade não selecionada");
		}

		if (!appsmith.store?.usuario_nome) {
			mensagens.push("⚠️ Nome do responsável não informado");
		}

		if (!input_CNPJ?.text) {
			mensagens.push("⚠️ CNPJ não informado");
		} else if (!/^\d{14}$/.test(input_CNPJ.text)) {
			mensagens.push("⚠️ CNPJ inválido (use apenas números, 14 dígitos)");
		}

		if (!input_PIX?.text) {
			mensagens.push("⚠️ Chave PIX não informada");
		}


		if (!MultiSelect1?.selectedOptionLabels || MultiSelect1.selectedOptionLabels.length === 0) {
			mensagens.push("⚠️ Serviço não selecionado");
		}

		const produtos = appsmith.store?.produtos;
		if (!Array.isArray(produtos) || produtos.length === 0) {
			mensagens.push("⚠️ Adicione pelo menos um produto à solicitação");
		} else {
			const invalidos = produtos
			.map((p, idx) => ({ p, idx: idx + 1 }))
			.filter(({ p }) =>
							!p?.id ||
							!p?.peca ||
							p?.preco === undefined ||
							p?.preco === null ||
							isNaN(Number(p.preco))
						 );

			if (invalidos.length > 0) {
				mensagens.push(
					`⚠️ Existem produtos com dados incompletos/inválidos: itens ${invalidos.map(i => i.idx).join(", ")}`
				);
			}
		}

		if (mensagens.length > 0) {
			showAlert(mensagens.join("\n"), "error");
			return false;
		}

		return true;
	},

	async salvarSolicitacao() {
		try {
			await gerar_id.gerarIdUnico();

			await solicitacoes_produtos.run();
			await solicitacoes_frota.run();

			showAlert("✅ Registrado com sucesso!", "success");
			lista_produtos.limpar_lista();
			upload_fotos.urls = [];
			resetWidget("orcamento_foto");
			resetWidget("Modal_solicitacoes");
			closeModal("Modal_solicitacoes");

		} catch (err) {
			showAlert("❌ Erro ao salvar: " + (err?.message ?? err), "error");
		}
	}
};