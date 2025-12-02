import axios from 'axios';

export default {
	myVar1: [],
	myVar2: {},
	
	async buscarRegistros() {
		try {
			const options = {
				method: 'GET',
				url: 'https://task.bluetechfilms.com.br/api/v2/tables/myf5wxoy3kp6mom/records',
				params: {
					offset: '0',
					limit: '25',
					where: '',
					viewId: 'vw8ghdyqcoq8t4gv'
				},
				headers: {
					'xc-token': appsmith.store.api_token  // ← coloque seu token no store
				}
			};

			const response = await axios.request(options);

			// Armazena na variável do Appsmith se quiser usar em widgets
			this.myVar1 = response.data;

			return response.data; // permite usar {{ JSObject.buscarRegistros() }}
		}
		catch (err) {
			console.error("Erro API:", err);
			return err;
		}
	}
}
