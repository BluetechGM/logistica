export default {
	verificarLogin() {
		const idUsuario = appsmith.store.matricula;

		if (!idUsuario) {
			// Usuário não está logado, redirecionar
			navigateTo("Login");
		}
	}
}
