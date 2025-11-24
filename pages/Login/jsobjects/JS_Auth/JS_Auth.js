export default {
  gerarSenhaComHash() {
    const senhaOriginal = Input_password.text;
    const salt = 'SALT123'; // você pode mudar esse valor ou gerar dinamicamente
    const senhaComSalt = senhaOriginal + salt;

    const hashBase64 = btoa(senhaComSalt); // codifica como base64

    return hashBase64;
  }
}



BuscarUsuarioPorEmail.data