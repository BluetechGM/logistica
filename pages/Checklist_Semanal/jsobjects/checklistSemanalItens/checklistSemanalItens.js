export default {
	setStatus: (itemCodigo, status) => {
		if (!itemCodigo) {
			console.error("❌ itemCodigo não informado");
			showAlert("Erro interno: item do checklist não identificado.", "error");
			return;
		}

		const atual = appsmith.store.checklist_semanal_itens || {};

		storeValue("checklist_semanal_itens", {
			...atual,
			[itemCodigo]: {
				...(atual[itemCodigo] || {}),
				status,
				fotos: atual[itemCodigo]?.fotos || []
			}
		});

		console.log(`🟢 Status atualizado: ${itemCodigo} → ${status}`);
	}
};
