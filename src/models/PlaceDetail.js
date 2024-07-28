import Place from "@/models/Place";
import Photo from "@/models/Photo";

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
    this.photos = photos.map((photo) => new Photo(photo));
    this.country = country;
  }

  isValid() {
    return this.name.trim() && this.description.trim() && this.rating != 0;
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
