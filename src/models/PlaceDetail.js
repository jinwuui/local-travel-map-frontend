import Place from "@/models/Place";

export default class PlaceDetail extends Place {
  constructor({
    placeId,
    lat,
    lng,
    name,
    categories,
    description = "",
    rating = 0,
    photos = [],
  }) {
    super({
      placeId: placeId,
      lat: lat,
      lng: lng,
      name: name,
      categories: categories,
    });
    this.description = description;
    this.rating = rating;
    this.photos = photos;
  }

  isValid() {
    return this.name.trim() && this.description.trim() && this.rating != 0;
  }

  getFirstPhoto() {
    return this.photos.length > 0
      ? process.env.VUE_APP_BASE_IMAGE_URL + "/" + this.photos[0].filename
      : process.env.VUE_APP_DEFAULT_IMAGE_URL;
  }

  static fromJson(json) {
    return new PlaceDetail({
      placeId: json.placeId,
      lat: json.lat,
      lng: json.lng,
      name: json.name,
      categories: json.categories,
      description: json.description,
      rating: json.rating,
      photos: json.photos,
    });
  }

  static fromPlace({ place, description, rating, photos }) {
    return new PlaceDetail({
      placeId: place.placeId,
      lat: place.lat,
      lng: place.lng,
      name: place.name,
      categories: place.categories,
      description: description,
      rating: rating,
      photos: photos,
    });
  }
}
