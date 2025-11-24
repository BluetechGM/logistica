export default {
   async enviarIntercorrencia() {

      if (!Select_intecorrenciavalidacao.selectedOptionValue) {
          showAlert("Selecione se a intercorrência é válida ou não!", "error");
          return;
      }

      if (!Input1_justificativa.text || Input1_justificativa.text.trim() === "") {
          showAlert("Preencha a justificativa antes de enviar!", "error");
          return;
      }

      try {
          await LANCAR_JUSTIFICATIVA.run();
          await LISTA_DE_INTERCORRENCIAS.run();

          showAlert("Atualizado com sucesso!", "success");

          resetWidget("Select_intecorrenciavalidacao");
          resetWidget("Input1_justificativa");
          resetWidget("LSITA_DE_INTECORRENCIAS__");

      } catch (err) {
          showAlert("Erro ao enviar: " + err, "error");
      }
   }
}
