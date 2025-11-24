export default {
  checkMatricula() {
        const allowedMatriculas = [1200,542,915,670,1189,1065,527,1423];

    // pega direto do store
    const valor = Number(String(appsmith.store.matricula).trim());

    // faz a validação
    const resultado = allowedMatriculas.includes(valor);

    // salva em uma variável global
    storeValue("ver_abastecimento", resultado);

    // retorna o resultado (true ou false)
    return resultado;
  }
}
