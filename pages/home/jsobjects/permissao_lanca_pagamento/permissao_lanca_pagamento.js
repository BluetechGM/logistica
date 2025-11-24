export default {
	checkMatricula() {
		const allowedMatriculas = [
			542,
			332,	
			670,
			527,
			1423,
			1065
		];

		// pega direto do store
		const valor = Number(String(appsmith.store.matricula).trim());

		// faz a validação invertida
		const resultado = allowedMatriculas.includes(valor);

		// salva em uma variável global
		storeValue("lancar_pagamento", resultado);

		// retorna o resultado (true ou false)
		return resultado;
	}
}

