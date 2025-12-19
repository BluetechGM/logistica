export default {
	visivel() {
		if (typeof mfs_list_comprovante.triggeredItem.nfe_servico_pdf === "string") {
  		return (mfs_list_comprovante.triggeredItem.nfe_servico_pdf.toLowerCase().includes(".jpg"))
		}
		return false
	}
}