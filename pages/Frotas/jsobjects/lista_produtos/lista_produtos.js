export default {
  myVar1: [],
  myVar2: {},

  // Limpa a lista de produtos do store
  async limpar_lista () {
    await storeValue('produtos', []);
    // showAlert('Lista limpa!', 'success');
  },

  // Adiciona um item na lista de produtos do store
  async adicionar_item () {
    // Lê valores dos widgets
    const peca  = Select_pecas.selectedOptionLabel;
    const marca = Select_marca.selectedOptionLabel;
		const quant =  Input_quantidade.text;
		const total =  Input_preco_total.text;
		const precouni =  Input_precounitario.text;
		const precoso  =  Input_precopecaservico.text;
		const servicopeca = selecione_servidapeca.selectedOptionLabel;

    // Converte preço em string e aplica trim
    const precoStr = String(Input_precounitario.text || "").trim();

    // Trata como número (aceita "1234,56" ou "1234.56")
    const preco = Number(
      precoStr
        .replace(/\./g, '')   // remove separadores de milhar
        .replace(',', '.')    // troca vírgula por ponto
    );

    // Validações simples
    if (!peca || !marca || !precoStr) {
      // showAlert('Preencha peça, marca e preço.', 'warning');
      return;
    }
    if (isNaN(preco)) {
      // showAlert('Preço inválido.', 'error');
      return;
    }

    // Gera ID único
    const id = Date.now().toString();

    // Monta o item
    const item = {
      id: id,
      peca: peca,
      marca: marca,
      preco: preco,
			quant: quant,
			total: total,
			preco_unitario: precouni,
			precoso: precoso,
			servicopeca: servicopeca,
			
    };

    // Busca lista atual no store e adiciona
    const listaAtual = appsmith.store.produtos || [];
    const novaLista = [...listaAtual, item];

    // Salva de volta no store
    await storeValue('produtos', novaLista);

    // showAlert('Produto adicionado!', 'success');
  },

  // Remove item pelo ID
  async removerPorId(id) {
    const listaAtual = appsmith.store.produtos || [];
    const novaLista = listaAtual.filter(item => item.id !== id);
    await storeValue('produtos', novaLista);
  }
}
