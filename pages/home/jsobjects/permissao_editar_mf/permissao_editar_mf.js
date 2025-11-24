export default {
  checkMatricula() {
        const allowedMatriculas = [1253,542,1200,915,670,1189,1065,527,1423,1065,1439];

    // pega direto do store
    const valor = Number(String(appsmith.store.matricula).trim());

    // faz a validação
    const resultado = allowedMatriculas.includes(valor);

    // salva em uma variável global
    storeValue("permissao", resultado);

    // retorna o resultado (true ou false)
    return resultado;
  }
}
