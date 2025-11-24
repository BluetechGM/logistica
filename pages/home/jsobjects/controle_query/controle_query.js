export default {
  checkMatricula(valor = appsmith.store.matricula) {
    const allowedMatriculas = [1253, 542, 1200, 915, 670,1189,1065,1055,527,1423];

    // garante que é número
    const numero = Number(String(valor).trim());

    // verifica se está na lista
    const permitido = allowedMatriculas.includes(numero);

    // salva o resultado globalmente
    storeValue("permissao_query", permitido);

    // retorna true ou false
    return permitido;
  },

  // versão genérica para qualquer lista
  isInList(valor, lista) {
    const numero = Number(String(valor).trim());
    return Array.isArray(lista) && lista.includes(numero);
  }
};
