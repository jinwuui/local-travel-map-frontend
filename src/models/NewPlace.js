export default class NewPlace {
  constructor({
    lat,
    lng,
    name,
    description,

    rating = null,
    category = null,
    photos = [],
  }) {
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.description = description;

    this.rating = rating;
    this.category = category;
    this.photos = photos;
  }

  isValid() {
    return (
      this.lat != null &&
      this.lng != null &&
      this.name != null &&
      this.name.trim() !== "" &&
      this.description != null &&
      this.description.trim() !== "" &&
      NewPlace.isLatitudeValid(this.lat) &&
      NewPlace.isLongitudeValid(this.lng) &&
      NewPlace.isRatingValid(this.rating)
    );
  }

  toFormData() {
    const formData = new FormData();

    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        formData.append(key, this[key]);
      }
    }

    return formData;
  }

  static isRatingValid(rating) {
    return rating == null || (1 <= rating && rating <= 5);
  }

  static isLatitudeValid(lat) {
    return -90 <= lat && lat <= 90;
  }

  static isLongitudeValid(lng) {
    return -180 <= lng && lng <= 180;
  }
}
