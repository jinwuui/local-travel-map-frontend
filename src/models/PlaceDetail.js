import Place from "@/models/Place";
import Image from "@/models/Image";

export default class PlaceDetail extends Place {
  constructor({
    placeId,
    lat,
    lng,
    name,
    categories,
    isBookmarked,
    description = "",
    rating = 0,
    imageUrls = [],
    country,
  }) {
    super({
      placeId,
      lat,
      lng,
      name,
      categories,
      isBookmarked,
    });
    this.description = description;
    this.rating = rating;
    this.imageUrls = imageUrls.map((url) => new Image(url));
    this.country = country;
  }

  isValid() {
    return this.name.trim() && this.description.trim() && this.rating != 0;
  }

  static fromJson(json) {
    return new PlaceDetail({ ...json });
  }
}
