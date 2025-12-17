export default {
  validarEInserirChecklist: async () => {

    console.log("🧪 DEBUG INÍCIO validarEInserirChecklist");

    console.log("📸 checklist_fotos_urls (store):",
      appsmith.store.checklist_fotos_urls,
      " | tipo:",
      typeof appsmith.store.checklist_fotos_urls
    );

    console.log(
      "📸 checklist_fotos_urls é array?",
      Array.isArray(appsmith.store.checklist_fotos_urls)
    );

    if (Array.isArray(appsmith.store.checklist_fotos_urls)) {
      console.log(
        "📸 Quantidade de fotos:",
        appsmith.store.checklist_fotos_urls.length
      );
    }

    if (!Select_Cidade_abasCopy.selectedOptionValue) {
      showAlert("Selecione a Cidade/Filial", "warning");
      return;
    }

    if (!Select_placa_abasCopy.selectedOptionLabel) {
      showAlert("Selecione a Placa", "warning");
      return;
    }

    if (!Select_condutor_abasCopy.selectedOptionValue) {
      showAlert("Selecione o Condutor", "warning");
      return;
    }

    if (!appsmith.store?.usuario_nome) {
      showAlert("Usuário responsável não identificado", "error");
      return;
    }

    const odometro = Number(Input_odometro?.text);
    if (!odometro || isNaN(odometro) || odometro <= 0) {
      showAlert("Informe um odômetro válido", "warning");
      return;
    }

    // 🔹 CHECKLIST
    const itensChecklist = {
      Combustivel: "Nível de combustível",
      Farol: "Farol",
      LuzFreio: "Luz de freio",
      Setas: "Setas",
      Pneu: "Pneu dianteiro",
      PneuTraseiro: "Pneu traseiro",
      Vazamento: "Vazamento de óleo",
      FreioDianteiro: "Freio dianteiro",
      FreioTraseiro: "Freio traseiro",
      ManetesPedaleiras: "Manetes e pedaleiras",
      Espelhos: "Espelhos",
      Buzina: "Buzina",
      Documentacao: "Documentação (CRLV)"
    };

    const itensNaoMarcados = Object.entries(itensChecklist)
      .filter(([key]) => !appsmith.store[key])
      .map(([, label]) => label);

    if (itensNaoMarcados.length > 0) {
      showAlert(
        `⚠️ Itens não marcados:\n- ${itensNaoMarcados.join("\n- ")}`,
        "warning"
      );
      return;
    }

    // 🔥 DEBUG ANTES DA QUERY
    console.log("🚨 DEBUG ANTES DA QUERY Inserir_checklist_diario");
    console.log("📦 Payload fotos (string):",
      JSON.stringify(appsmith.store.checklist_fotos_urls || [])
    );

    try {
      const result = await Inserir_checklist_diario.run();

      console.log("✅ QUERY EXECUTADA COM SUCESSO:", result);

      showAlert("Checklist diário lançado com sucesso!", "success");

      Object.keys(itensChecklist).forEach(item => removeValue(item));

      removeValue("checklist_fotos_urls");
      resetWidget("checklist_fotos", true);
      resetWidget("Input_odometro", true);
      resetWidget("Select_Cidade_abasCopy", true);
      resetWidget("Select_condutor_abasCopy", true);
      resetWidget("Select_placa_abasCopy", true);
      resetWidget("observacoes_checklist", true);

      closeModal("checklist");

    } catch (error) {
      console.error("❌ ERRO AO INSERIR CHECKLIST:", error);

      showAlert(
        error?.message || "Erro ao lançar checklist",
        "error"
      );
    }
  }
};
