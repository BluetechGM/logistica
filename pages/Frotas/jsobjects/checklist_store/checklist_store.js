export default {
  popularStore() {
    const d = get_checklist_by_id.data?.[0];

    if (!d) {
      showAlert("Checklist não encontrado", "warning");
      return;
    }

    // 🔹 Modo visualização
    storeValue("modoChecklist", "view");

    // 🔹 Itens do checklist
    storeValue("Combustivel", d.nivel_combustivel);
    storeValue("Farol", d.farol);
    storeValue("LuzFreio", d.luz_freio);
    storeValue("Setas", d.setas);
    storeValue("Pneu", d.pneu);
    storeValue("PneuTraseiro", d.pneu_traseiro); // ✅ NOVO
    storeValue("Vazamento", d.vazamento_oleo);
    storeValue("FreioDianteiro", d.freio_dianteiro);
    storeValue("FreioTraseiro", d.freio_traseiro);
    storeValue("ManetesPedaleiras", d.manetes_pedaleiras);
    storeValue("Espelhos", d.espelhos);
    storeValue("Buzina", d.buzina);
    storeValue("Documentacao", d.documentacao_crlv);

    // 🔹 Observações
    storeValue("Observacoes", d.observacoes || "");

    // 🔥 FOTOS DO CHECKLIST (PONTO-CHAVE)
    storeValue(
      "checklist_fotos_urls",
      Array.isArray(d.fotos_checklist) ? d.fotos_checklist : []
    );

    console.log("📸 Fotos do checklist carregadas:", d.fotos_checklist);
  }
};
