export default {
  async gerarIdUnico() {
    return Date.now().toString() + "_" + Math.random().toString(36).substring(2, 9);
  }
}
