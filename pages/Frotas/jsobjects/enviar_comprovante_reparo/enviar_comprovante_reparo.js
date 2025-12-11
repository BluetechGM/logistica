export default {
  async enviar() {
    try {
      // Validação - CORRIGIDO para usar appsmith.store
      if (!appsmith.store.itemSelecionado?.id_solicitacao) {
        showAlert('⚠️ Selecione um item da lista!', 'warning');
        return;
      }
      
      const temFotos = orcamento_fotoCopy.files && orcamento_fotoCopy.files.length > 0;
      const temVideo = orcamento_videoCopy.files && orcamento_videoCopy.files.length > 0;
      
      if (!temFotos && !temVideo) {
        showAlert('⚠️ Selecione pelo menos uma foto ou vídeo!', 'warning');
        return;
      }
      
      // Upload das fotos (se houver)
      if (temFotos) {
        await upload_fotos_comprovante.uploadMultiplas();
      }
      
      // Upload do vídeo (se houver)
      if (temVideo) {
        showAlert('📤 Enviando vídeo...', 'info');
        await upload_video_comprovante.run();
      }
      
      // Salva no banco
      await update_comprovante_reparo.run();
      
      // Atualiza a lista
      await solicitacoes_frota_list.run();
      
      // Limpa os widgets
      resetWidget('orcamento_fotoCopy');
      resetWidget('orcamento_videoCopy');
      
      showAlert('✅ Comprovante enviado com sucesso!', 'success');
      
    } catch (error) {
      console.error('Erro ao enviar:', error);
      showAlert('❌ Erro ao enviar: ' + error.message, 'error');
    }
  }
}