export default {
  popularStore() {
    const d = get_checklist_by_id.data?.[0];
    if (!d) {
      showAlert("Checklist não encontrado", "warning");
      return;
    }

    storeValue("modoChecklist", "view");

    storeValue("Combustivel", d.nivel_combustivel);
    storeValue("Farol", d.farol);
    storeValue("LuzFreio", d.luz_freio);
    storeValue("Setas", d.setas);
    storeValue("Pneu", d.pneu);
    storeValue("Vazamento", d.vazamento_oleo);
    storeValue("FreioDianteiro", d.freio_dianteiro);
    storeValue("FreioTraseiro", d.freio_traseiro);
    storeValue("ManetesPedaleiras", d.manetes_pedaleiras);
    storeValue("Espelhos", d.espelhos);
    storeValue("Buzina", d.buzina);
    storeValue("Documentacao", d.documentacao_crlv);

    storeValue("Observacoes", d.observacoes || "");
  }
};
