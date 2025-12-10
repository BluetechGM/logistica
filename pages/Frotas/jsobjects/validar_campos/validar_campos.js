export default {
  validarCampos() {
    const mensagens = [];

    if (!Select_placa.selectedOptionLabel) {
      mensagens.push("⚠️ Placa não informada");
    }
    if (!foto_orcamento_pdf_ou_imagem.data.secure_url) {
      mensagens.push("⚠️ Voce precisa anexar o pdf ou foto do Orçamento");
    }
    if (!Input_OdometroAtual.text || isNaN(Number(Input_OdometroAtual.text))) {
      mensagens.push("⚠️ Odômetro atual inválido ou não informado");
    }
    if (!Select_Cidade.selectedOptionLabel) {
      mensagens.push("⚠️ Cidade não selecionada");
    }
    if (!appsmith.store.usuario_nome) {
      mensagens.push("⚠️ Nome do responsável não informado");
    }
    if (!MultiSelect1.selectedOptionLabels) {
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
          `⚠️ Existem produtos com dados incompletos/invalidos: itens ${invalidos.map(i => i.idx).join(", ")}`
        );
      }
    }

    if (mensagens.length > 0) {
      showAlert(mensagens.join("\n"), "error");
      return false;
    }
    return true;
  },

  getPayload() {
    return {
      Placa: Select_placa.selectedOptionLabel,
      OdometroAtual: Number(Input_OdometroAtual.text),
      Cidade: Select_Cidade.selectedOptionLabel,
      CriadoPor: appsmith.store.usuario_nome,
      Servico: MultiSelect1.selectedOptionLabels,
      Produtos: appsmith.store?.produtos ?? []
    };
  },

  async salvarSolicitacao() {
    const valido = this.validarCampos();
    if (!valido) return;

    try {
      // 1️⃣ GERA O ID ÚNICO
      await gerar_id.gerarIdUnico();

      // 2️⃣ FAZ UPLOAD DAS FOTOS (se houver)
      if (orcamento_foto.files && orcamento_foto.files.length > 0) {
        showAlert(`📤 Enviando ${orcamento_foto.files.length} foto(s)...`, 'info');
        await upload_fotos.uploadMultiplas();
      }

      // 3️⃣ Insere os produtos
      await solicitacoes_produtos.run();

      // 4️⃣ Insere a solicitação
      await solicitacoes_frota.run();

      showAlert('✅ Registrado com sucesso!', 'success'); 
      lista_produtos.limpar_lista();
      resetWidget('orcamento_foto');
      resetWidget('Modal_solicitacoes');
      closeModal('Modal_solicitacoes');

    } catch (err) {
      showAlert("❌ Erro ao salvar: " + (err?.message ?? err), "error");
    }
  }
};