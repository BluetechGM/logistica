export default {
  verificarEstadoChecklistSemanal: () => {
    const store = appsmith.store.checklist_semanal_itens;

    console.log("🧪 DIAGNÓSTICO – checklist_semanal_itens");

    if (!store) {
      console.warn("⚠️ Store checklist_semanal_itens NÃO existe.");
      return;
    }

    if (typeof store !== "object") {
      console.error(
        "❌ Store checklist_semanal_itens NÃO é objeto:",
        store
      );
      return;
    }

    const itens = Object.entries(store);

    if (itens.length === 0) {
      console.warn("⚠️ Store checklist_semanal_itens está vazio.");
      return;
    }

    itens.forEach(([codigo, dados]) => {
      console.log(`📌 Item: ${codigo}`);

      if (!dados || typeof dados !== "object") {
        console.error("  ❌ Dados inválidos:", dados);
        return;
      }

      // Status
      if (!dados.status) {
        console.warn("  ⚠️ status NÃO definido");
      } else {
        console.log("  🟢 status:", dados.status);
      }

      // Fotos
      if (!Array.isArray(dados.fotos)) {
        console.error(
          "  ❌ fotos NÃO é array:",
          dados.fotos
        );
      } else {
        console.log(
          `  📸 fotos: ${dados.fotos.length} arquivo(s)`
        );
      }
    });
  }
};
