export default {
  validarEInserirChecklist: async () => {

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

    const itensChecklist = {
      Combustivel: "Nível de combustível",
      Farol: "Farol",
      LuzFreio: "Luz de freio",
      Setas: "Setas",
      Pneu: "Pneu",
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
      showAlert(`⚠️ Itens não marcados:\n- ${itensNaoMarcados.join("\n- ")}`, "warning");
      return;
    }

    try {
      await Inserir_checklist_diario.run();

      showAlert("Checklist diário lançado com sucesso!", "success");

      // Limpa os itens do checklist (C/NC)
      Object.keys(itensChecklist).forEach(item => removeValue(item));

      // Limpa Selects e Observações (reset real dos widgets)
      resetWidget("Select_Cidade_abasCopy", true);
      resetWidget("Select_condutor_abasCopy", true);
      resetWidget("Select_placa_abasCopy", true);
      resetWidget("observacoes_checklist", true);

      // Fecha o modal
      closeModal("checklist");

    } catch (error) {
      console.error("ERRO AO INSERIR CHECKLIST:", error);
      showAlert(error?.message || "Erro ao lançar checklist", "error");
    }
  }
};
