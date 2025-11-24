export default {
  logoutUsuario() {
    // Limpa as variáveis globais
    removeValue("usuario_nome");
    removeValue("usuario_email");
    removeValue("usuario_id");

    // Exibe mensagem de saída (opcional)
    showAlert("Você foi deslogado 👋", "info");

    // Redireciona para a tela de login
    navigateTo("Login");
  }
}
