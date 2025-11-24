export default {
  checkMatricula() {
    const allowedMatriculas = [
	915,1423
];

    // pega direto do store
    const valor = Number(String(appsmith.store.matricula).trim());

    // faz a validação invertida
    const resultado = !allowedMatriculas.includes(valor);

    // salva em uma variável global
    storeValue("atualizar_intercorrencia", resultado);

    // retorna o resultado (true ou false)
    return resultado;
  }
}

