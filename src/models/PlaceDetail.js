import Place from "@/models/Place";

export default class PlaceDetail extends Place {
  constructor({
    placeId,
    lat,
    lng,
    name,
    categories,
    isFavorite,
    description = "",
    rating = 0,
    photos = [],
    country,
  }) {
    super({
      placeId,
      lat,
      lng,
      name,
      categories,
      isFavorite,
    });
    this.description = description;
    this.rating = rating;
    this.photos = photos;
    this.country = country;
  }

  isValid() {
    return this.name.trim() && this.description.trim() && this.rating != 0;
  }

  getFirstPhoto() {
    return this.photos.length > 0
      ? process.env.VUE_APP_THUMB_IMAGE_URL + this.photos[0].filename
      : process.env.VUE_APP_DEFAULT_IMAGE_URL;
  }

  static fromJson(json) {
    return new PlaceDetail({ ...json });
  }

  static fromPlace({ place, description, rating, photos, country }) {
    return new PlaceDetail({
      ...place,
      description,
      rating,
      photos,
      country,
    });
  }
}
