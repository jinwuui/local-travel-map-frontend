export default class Photo {
  constructor({ photoId, filename, order }) {
    this.photoId = photoId;
    this.filename = filename;
    this.order = order;

    this.resizedPhotoUrl_t = this.getResizedPhotoUrl("t");
    this.resizedPhotoUrl_s = this.getResizedPhotoUrl("s");
    this.resizedPhotoUrl_m = this.getResizedPhotoUrl("m");
    this.resizedPhotoUrl_l = this.getResizedPhotoUrl("l");
  }

  getResizedPhotoUrl(type) {
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
