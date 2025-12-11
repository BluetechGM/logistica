export default {
  urls: [],

  async uploadMultiplas() {
    const arquivos = orcamento_fotoCopy.files || [];

    if (arquivos.length === 0) {
      return [];
    }
    
    if (arquivos.length > 20) {
      showAlert('⚠️ Máximo de 20 fotos permitidas!', 'warning');
      return [];
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
    }

    return this.urls;
  },

  getUrlsJSON() {
    return JSON.stringify(this.urls);
  }
}