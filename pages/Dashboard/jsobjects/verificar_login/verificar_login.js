export default {
	verificarLogin() {
		const idUsuario = appsmith.store.usuario_id;

		if (!idUsuario) {
			// Usuário não está logado, redirecionar
			navigateTo("Login");
		}
	}
}
