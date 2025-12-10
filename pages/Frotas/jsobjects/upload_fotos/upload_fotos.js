export default {
  urls: [],
  
  async uploadMultiplas() {
    const arquivos = orcamento_foto.files || [];
    
    if (arquivos.length === 0) {
      showAlert('⚠️ Nenhuma foto selecionada!', 'warning');
      return;
    }
    
    this.urls = [];
    let erros = 0;
    
    showAlert(`📤 Enviando ${arquivos.length} foto(s)...`, 'info');
    
    for (let i = 0; i < arquivos.length; i++) {
      try {
        await foto_orcamento_imagem.run({ file: arquivos[i].data });
        
        const url = foto_orcamento_imagem.data?.secure_url;
        if (url) {
          this.urls.push(url);
        }
      } catch (e) {
        erros++;
        console.error('Erro no upload:', e);
      }
    }
    
    if (erros > 0) {
      showAlert(`⚠️ ${erros} foto(s) falharam no envio`, 'warning');
    } else {
      showAlert(`✅ ${this.urls.length} foto(s) enviada(s) com sucesso!`, 'success');
    }
    
    return this.urls;
  },
  
  getUrlsJSON() {
    return JSON.stringify(this.urls);
  }
}