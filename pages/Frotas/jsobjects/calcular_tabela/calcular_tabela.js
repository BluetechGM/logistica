export default {
  getDadosTabela() {
    let dados = historico_precos_pecas.data || [];
    
    // Aplica filtro de PERÍODO (dias)
    const diasFiltro = parseInt(Input_Periodo_Dias.text) || 0;
    if (diasFiltro > 0) {
      const hoje = new Date();
      const dataLimite = new Date(hoje.getTime() - (diasFiltro * 24 * 60 * 60 * 1000));
      dados = dados.filter(d => {
        if (!d.data_solicitacao) return false;
        const dataItem = new Date(d.data_solicitacao);
        return dataItem >= dataLimite;
      });
    }
    
    // Aplica filtro de cidade
    const cidadeFiltro = Select_Cidade_Filtro.selectedOptionValue;
    if (cidadeFiltro && cidadeFiltro !== '') {
      dados = dados.filter(d => d.cidade && d.cidade.toUpperCase().includes(cidadeFiltro.toUpperCase()));
    }
    
    // Aplica filtro de PEÇA (MultiSelect)
    const pecasFiltro = Select_Servico_Filtro.selectedOptionValues || [];
    if (pecasFiltro.length > 0) {
      dados = dados.filter(d => {
        if (!d.peca) return false;
        return pecasFiltro.some(p => d.peca.trim().toLowerCase() === p.trim().toLowerCase());
      });
    }
    
    // Agrupa por peça
    const pecasAgrupadas = {};
    dados.forEach(d => {
      if (!d.peca) return;
      if (!pecasAgrupadas[d.peca]) {
        pecasAgrupadas[d.peca] = {
          peca: d.peca,
          valores: [],
          datas: new Set()
        };
      }
      pecasAgrupadas[d.peca].valores.push(Number(d.preco_unitario) || 0);
      pecasAgrupadas[d.peca].datas.add(d.data_formatada);
    });
    
    // Calcula quantidade de PONTOS (datas únicas) e média
    const resultado = Object.values(pecasAgrupadas).map(p => {
      const soma = p.valores.reduce((a, b) => a + b, 0);
      const media = soma / p.valores.length;
      
      return {
        peca: p.peca,
        quantidade: p.datas.size,
        media: 'R$ ' + media.toFixed(2).replace('.', ',')
      };
    });
    
    return resultado.sort((a, b) => b.quantidade - a.quantidade);
  },
  
  downloadCSV() {
    const dados = this.getDadosTabela();
    if (dados.length === 0) {
      showAlert('Nenhum dado para exportar', 'warning');
      return;
    }
    
    let csv = 'Peça;Qtd. Pontos;Média\n';
    dados.forEach(d => {
      csv += `${d.peca};${d.quantidade};${d.media}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `historico_precos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    showAlert('Download realizado com sucesso!', 'success');
  }
}