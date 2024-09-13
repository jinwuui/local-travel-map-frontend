import Place from "@/models/Place";
import Image from "@/models/Image";

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
    images = [],
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
    this.images = images.map((image) => new Image(image));
    this.country = country;
  }

  isValid() {
    return this.name.trim() && this.description.trim() && this.rating != 0;
  }

  static fromJson(json) {
    return new PlaceDetail({ ...json });
  }

  static fromPlace({ place, description, rating, images, country }) {
    return new PlaceDetail({
      ...place,
      description,
      rating,
      images,
      country,
    });
  }
}
