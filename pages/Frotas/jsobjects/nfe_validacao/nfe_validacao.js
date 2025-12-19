export default {
  async anexarNFE() {
    const servicoData = nfe_servicoCopy?.files?.[0]?.data;
    const produtoData = nfe_produtosCopy?.files?.[0]?.data;

    if (servicoData || produtoData) {
      await solicitacoes_enexar_nfes.run()
        .then(() => {
          closeModal(ANEXAR_PDF.name);
          showAlert('Anexado com sucesso!', 'success');
          solicitacoes_frota_list.run();
        })
        .catch((err) => {
          showAlert('Erro ao anexar: ' + err.message, 'error');
        });
    } else {
      showAlert('Envie pelo menos um arquivo NFE (serviço ou produto).', 'warning');
    }
  }
};