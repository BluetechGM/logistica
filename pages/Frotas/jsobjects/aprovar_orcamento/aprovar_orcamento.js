export default {
  /**
   * Função principal: recebe opcionalmente itemSelecionado.
   * Se itemSelecionado não for passado, tenta ler appsmith.store.itemSelecionado como fallback.
   * Retorna Promise<boolean>.
   */
  async podeLiberarTela(itemSelecionado) {
    console.log("➡️ podeLiberarTela chamada. itemParametro:", itemSelecionado);

    // fallback: tentar ler do store se parâmetro não foi passado
    const item = itemSelecionado || appsmith.store.itemSelecionado;
    console.log("➡️ item final usado para validação:", item);

    if (!item) {
      console.log("❌ Nenhum item disponível (itemSelecionado está undefined). Retornando FALSE.");
      return false;
    }

    // 1) Executa a query de autorização (se já estiver no store você pode evitar a chamada; aqui chamamos sempre)
    try {
      console.log("📡 Executando validar_autorizacao.run()...");
      const result = await validar_autorizacao.run();
      console.log("📡 Resultado validar_autorizacao:", result);
      const autorizacao = result?.[0];
      console.log("📄 autorizacao extraída:", autorizacao);

      if (!autorizacao) {
        console.log("❌ Sem autorização no retorno da query. Retornando FALSE.");
        return false;
      }

      const temPermissao = autorizacao.permissao_editar_mf === false; // false = autorizado
      const ehGestor = autorizacao.aprovacao_orcamento_auto_valor === false; // false = gestor

      console.log("🔐 temPermissao:", temPermissao, "👔 ehGestor:", ehGestor);

      // 2) calcula valor do item
      const valor =
        Number(item.valor_total_produtos || 0) +
        Number(item.valor_total_servicos || 0);
      const existeOrcamentoAcimaDe50 = valor > 1000;

      console.log("💰 valor calculado:", valor, "acima de 1000:", existeOrcamentoAcimaDe50);

      // 3) regras
      if (!temPermissao) {
        console.log("⛔ Usuário NÃO tem permissão. FALSE");
        return false;
      }

      if (ehGestor) {
        console.log("✅ Usuário é gestor. TRUE");
        return true;
      }

      if (existeOrcamentoAcimaDe50) {
        console.log("⛔ Valor > 1000 e usuário não é gestor. FALSE");
        return false;
      }

      console.log("✅ Permissão OK e valor baixo. TRUE");
      return true;
    } catch (err) {
      console.error("❗ Erro ao executar validar_autorizacao:", err);
      return false;
    }
  },

  /**
   * Helper: chama podeLiberarTela usando o item do store.
   * Útil para quando você só consegue selecionar a função pelo dropdown (sem passar params).
   */
  async podeLiberarTelaFromStore() {
    return await this.podeLiberarTela(appsmith.store.itemSelecionado);
  }
};
