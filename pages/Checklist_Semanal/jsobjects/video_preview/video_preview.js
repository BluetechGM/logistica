export default {
	getPreviewUrl(url) {
		if (!url) return "";

		// Se for vídeo do Cloudinary
		if (url.includes("/video/upload/")) {
			return url
				.replace("/video/upload/", "/video/upload/so_0/")
				.replace(/\.(mp4|webm|mov)$/i, ".jpg");
		}

		// Caso contrário, assume imagem
		return url;
	}
};
