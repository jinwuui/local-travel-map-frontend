export default class Image {
  constructor(url) {
    this.originalUrl = url;

    this.resizedImageUrl_t = this.getResizedImageUrl("t");
    this.resizedImageUrl_s = this.getResizedImageUrl("s");
    this.resizedImageUrl_m = this.getResizedImageUrl("m");
    this.resizedImageUrl_l = this.getResizedImageUrl("l");
  }

  getResizedImageUrl(type) {
    const baseUrl = process.env.VUE_APP_RESIZED_IMAGE_URL;
    const resizedImageName = this.originalUrl
      .replace(/\.[^.]+$/, ".webp")
      .replace("/images/originals", "");
    return `${baseUrl}${type}${resizedImageName}`;
  }
}
