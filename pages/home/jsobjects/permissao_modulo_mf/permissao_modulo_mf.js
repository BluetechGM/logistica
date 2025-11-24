export default {
	checkMatricula() {
		const allowedMatriculas = [
			913,   // DENIS
			1196,  // MARCOS
			749,   // LUIS
			574,   // EMANUEL
			1022,  // BRENDA
			1055,  // RAFAELLA
			1181,  // GRAZIELLY
			1050,  // KARINNA
			607,   // VICTOR
			265,   // RODRIGO
			325,   // GUILHERME
			1254, // GABRIEL
			1200,
			542,
			1253,
			915,
			332,
			670,
			1189,
			1065,
			1055,
			527,
			823,
			1423,
			1439
		];

		// pega direto do store
		const valor = Number(String(appsmith.store.matricula).trim());

		// faz a validação invertida
		const resultado = !allowedMatriculas.includes(valor);

		// salva em uma variável global
		storeValue("modulo_mf", resultado);

		// retorna o resultado (true ou false)
		return resultado;
	}
}

