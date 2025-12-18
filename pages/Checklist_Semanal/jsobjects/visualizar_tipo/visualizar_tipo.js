export default {

  isImage: () => {
    const url = appsmith.store.referencia_url || "";
    return url !== "" && url.includes("/image/");
  },

  isVideo: () => {
    const url = appsmith.store.referencia_url || "";
    return url !== "" && url.includes("/video/");
  }

};
