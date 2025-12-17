export default {

  /* =========================================================
   * 1️⃣ UPLOAD INICIAL – USADO ANTES DE INSERIR O CHECKLIST
   *    → sobrescreve o store checklist_fotos_urls
   * ========================================================= */
  uploadChecklistFotos: async () => {
    try {
      if (!checklist_fotos.files?.length) {
        showAlert("Nenhuma foto selecionada para upload", "warning");
        return [];
      }

      const urls = [];

      for (const file of checklist_fotos.files) {
        const res = await checklist_diario_fotos.run({
          file: file.data
        });

        if (!res?.secure_url) {
          throw new Error("Resposta inválida do servidor de imagens");
        }

        urls.push(res.secure_url);
      }

      // 🔹 Store usado no INSERT do checklist
      await storeValue("checklist_fotos_urls", urls);

      showAlert(`📸 ${urls.length} foto(s) enviada(s) com sucesso!`, "success");

      console.log("✅ uploadChecklistFotos → checklist_fotos_urls:", urls);

      return urls;

    } catch (error) {
      console.error("❌ ERRO uploadChecklistFotos:", error);

      showAlert(
        "Erro ao enviar as fotos. Verifique os arquivos e tente novamente.",
        "error"
      );

      return [];
    }
  },


  /* =========================================================
   * 2️⃣ UPLOAD DE NOVAS FOTOS – USADO NO BOTÃO "INSERIR"
   *    → NÃO sobrescreve nada
   *    → retorna array para ser concatenado no banco
   * ========================================================= */
  uploadNovasFotos: async () => {
    try {
      if (!atualizar_checklist_fotos.files?.length) {
        showAlert("Selecione ao menos uma foto para adicionar", "warning");
        return [];
      }

      const novasUrls = [];

      for (const file of atualizar_checklist_fotos.files) {
        const res = await checklist_diario_fotos.run({
          file: file.data
        });

        if (!res?.secure_url) {
          throw new Error("Resposta inválida do Cloudinary");
        }

        novasUrls.push(res.secure_url);
      }

      showAlert(
        `📷 ${novasUrls.length} nova(s) foto(s) adicionada(s)!`,
        "success"
      );

      console.log("✅ uploadNovasFotos → novasUrls:", novasUrls);

      return novasUrls;

    } catch (error) {
      console.error("❌ ERRO uploadNovasFotos:", error);

      showAlert(
        "Erro ao enviar novas fotos. Tente novamente.",
        "error"
      );

      return [];
    }
  }

};
