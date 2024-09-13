export default class Image {
  constructor({ imageId, filename, order }) {
    this.imageId = imageId;
    this.filename = filename;
    this.order = order;

    this.resizedImageUrl_t = this.getResizedImageUrl("t");
    this.resizedImageUrl_s = this.getResizedImageUrl("s");
    this.resizedImageUrl_m = this.getResizedImageUrl("m");
    this.resizedImageUrl_l = this.getResizedImageUrl("l");
  }

  getResizedImageUrl(type) {
    const baseUrl = process.env.VUE_APP_RESIZED_IMAGE_URL;
    const resizedFilename = this.convertToWebp(type);

    return `${baseUrl}${type}/${resizedFilename}`;
  }

  convertToWebp(suffix) {
    const extensionIndex = this.filename.lastIndexOf(".");
    const basename = this.filename.substring(0, extensionIndex);
    return `${basename}-${suffix}.webp`;
  }
}
