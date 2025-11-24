export default {
  async processarPagamento () {
    // Passo 1: buscar URL da foto
    await foto_url_pix_comprovante_pag.run();

    // Passo 2: validar campos obrigatórios
    const erros = [];

    const comprovante_abastecimento = foto_url_pix_comprovante_pag.data?.secure_url;
    const tipo_pagamento = 'pix_qrcode';
    const filial_pagamento = Select_Cidade_abas_com.selectedOptionLabel;
    const id_pagador = appsmith.store.matricula;
    const pago_por = appsmith.store.usuario_nome;
    const status_pagamento = 'Pago';
    const id_abastecimento = List_abascetimentos.selectedItem?.id_abastecimento;
		
					 

    if (!comprovante_abastecimento) erros.push("Comprovante de abastecimento (foto)");
    if (!filial_pagamento) erros.push("Filial do pagamento");
    if (!id_pagador) erros.push("ID do pagador");
    if (!pago_por) erros.push("Nome do pagador");
    if (!id_abastecimento) erros.push("ID do abastecimento");

    // Se houver campos faltando, alerta e interrompe
    if (erros.length > 0) {
      showAlert("Faltam os seguintes campos: " + erros.join(", "), "error");
      return;
    }

    // Passo 3: rodar query para anexar comprovante
    await anexa_coom_pag_abast.run();

    // Passo 4: atualizar lista
    await lista_de_abastecimento.run();
		resetWidget('info_abastecimento');

    showAlert("Pagamento registrado com sucesso!", "success");
  }
}
