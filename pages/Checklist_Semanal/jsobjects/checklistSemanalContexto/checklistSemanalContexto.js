export default {
  atualizarContexto: () => {
    const filial = Select_Cidade_abasCopy.selectedOptionValue;
    const placa = Select_placa_abasCopy.selectedOptionLabel;
    const condutor = Select_condutor_abasCopy.selectedOptionValue;
    const odometro = Number(Input_odometro?.text);

    storeValue("checklist_semanal_contexto", {
      filial_id: filial || null,
      placa: placa || null,
      condutor_id: condutor || null,
      odometro: !isNaN(odometro) && odometro > 0 ? odometro : null,
      usuario_execucao: appsmith.store.usuario_nome || null,
      data_checklist: new Date().toISOString().slice(0, 10)
    });

    console.log("🧠 Contexto checklist semanal atualizado:", {
      filial,
      placa,
      condutor,
      odometro
    });
  }
};
