export default {
  loginUsuario() {
    const row = login_usuario?.data?.[0];

    if (!row) {
      showAlert("Usuário não encontrado ❌", "error");
      return;
    }

    const senhaDigitada = (Input_password.text ?? "").trim();
    const senhaBanco = (row.SENHA ?? "").trim();

    if (!senhaBanco || senhaBanco === "SENHA NULA") {
      showAlert("Senha não cadastrada. Solicite o cadastro/recuperação de senha. ⚠️", "warning");
      return;
    }

    if (senhaDigitada === senhaBanco) {
      // guarda infos do usuário
      storeValue("usuario_nome", row.NOME);
      storeValue("usuario_id", row.CODUSUR);
      storeValue("matricula", row.MATRICULA);
      storeValue("nome_guerra", row.NOME_GUERRA);
			storeValue("password", row.SENHA);
			storeValue("CODFILIAL", row.CODFILIAL);
			storeValue("NOMEFILIAL", row.NOMEFILIAL);
			storeValue("NOMEFILIAL", row.NOMEFILIAL);
			storeValue("ESTADO", row.ESTADO);
			storeValue("NOME_GUERRA", row.NOME_GUERRA);
			
			
			
			

      // lista de códigos autorizados para ir à Home Central
      const codigosPermitidos = [149, 235, 146, 360, 361];

      if (codigosPermitidos.includes(Number(row.CODUSUR))) {
        showAlert("Login realizado com sucesso ✅", "success");
        navigateTo("home");
      } else {
        showAlert("Login realizado com sucesso  ✅", "warning");
        navigateTo("home");
      }
    } else {
      showAlert("Senha incorreta ❌", "error");
    }
  }
};
