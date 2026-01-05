export default {
	uploadFotoItemSemanal: async (itemCodigo, filePickerWidgetOrFiles) => {
		try {
			/* ===============================
       * 1️⃣ Validações críticas
       * =============================== */
			if (!itemCodigo) {
				throw new Error("Código do item não informado.");
			}

			if (!filePickerWidgetOrFiles) {
				throw new Error("FilePicker ou arquivos não foram passados.");
			}

			// Aceita tanto o widget quanto o array de arquivos diretamente
			let files;
			if (Array.isArray(filePickerWidgetOrFiles)) {
				files = filePickerWidgetOrFiles;
			} else if (filePickerWidgetOrFiles.files) {
				files = filePickerWidgetOrFiles.files;
			} else {
				files = [];
			}

			if (!files || files.length === 0) {
				showAlert("Nenhum arquivo foi selecionado. Tente novamente.", "warning");
				console.log("DEBUG - Parâmetro recebido:", filePickerWidgetOrFiles);
				console.log("DEBUG - Files extraídos:", files);
				return;
			}

			const file = files[0];

			if (!file?.data) {
				throw new Error("Arquivo selecionado não contém dados válidos.");
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
