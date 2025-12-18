export default {
  uploadReferencia: async () => {
    try {
      if (!checklist_referencia.files?.length) {
        showAlert("Selecione uma imagem de referência", "warning");
        return;
      }

      const file = checklist_referencia.files[0];

      const res = await checklist_semanal.run({
        file: file.data
      });

      if (!res?.secure_url) {
        throw new Error("Cloudinary não retornou URL");
      }

      // 🔥 AQUI É ONDE O STORE DEVE SER CRIADO
      await storeValue("referencia_imagem_url", res.secure_url);

      showAlert("📷 Imagem enviada com sucesso!", "success");

      console.log("✅ referencia_imagem_url:", res.secure_url);

    } catch (err) {
      console.error("❌ Erro upload referência:", err);
      showAlert("Erro ao enviar imagem", "error");
    }
  }
};
