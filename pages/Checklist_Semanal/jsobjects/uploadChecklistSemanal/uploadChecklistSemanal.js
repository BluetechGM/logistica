export default {
  uploadFotoItemSemanal: async (itemCodigo, filePickerWidget) => {
    try {
      /* ===============================
       * 1️⃣ Validações críticas
       * =============================== */
      if (!itemCodigo) {
        throw new Error("Código do item não informado.");
      }

      if (!filePickerWidget) {
        throw new Error("FilePicker não foi passado para a função.");
      }

      if (!filePickerWidget.files || filePickerWidget.files.length === 0) {
        showAlert("Selecione um arquivo (foto ou vídeo)", "warning");
        return;
      }

      const file = filePickerWidget.files[0];

      if (!file?.data) {
        throw new Error("Arquivo inválido ou sem dados.");
      }

      /* ===============================
       * 2️⃣ Upload Cloudinary
       * =============================== */
      const res = await checklist_semanal_item.run({
        file: file.data
      });

      console.log("☁️ Cloudinary OK:", res);

      if (!res?.secure_url) {
        throw new Error("Cloudinary não retornou a URL.");
      }

      const url = res.secure_url;

      /* ===============================
       * 3️⃣ Store (estrutura única e consistente)
       * =============================== */
      const storeAtual = appsmith.store.checklist_semanal_itens;

      if (storeAtual && typeof storeAtual !== "object") {
        throw new Error("Store checklist_semanal_itens corrompido.");
      }

      const atual = storeAtual || {};

      const itemAtual = atual[itemCodigo] || {
        status: null,
        fotos: []
      };

      if (!Array.isArray(itemAtual.fotos)) {
        throw new Error(`Campo fotos inválido para o item ${itemCodigo}`);
      }

      const novoStore = {
        ...atual,
        [itemCodigo]: {
          ...itemAtual,
          fotos: [...itemAtual.fotos, url]
        }
      };

      await storeValue("checklist_semanal_itens", novoStore);

      console.log("🧠 Store atualizado:", novoStore);

      /* ===============================
       * 4️⃣ Sucesso real
       * =============================== */
      showAlert("📸 Mídia adicionada ao item com sucesso!", "success");

      return url;

    } catch (error) {
      console.error("❌ ERRO uploadFotoItemSemanal:", error);

      showAlert(
        `❌ Falha ao salvar mídia no item.\nMotivo: ${error.message}`,
        "error"
      );
    }
  }
};
