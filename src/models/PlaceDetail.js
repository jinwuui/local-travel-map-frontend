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
  }

  static fromPlace({ place, description, rating }) {
    return new PlaceDetail({
      placeId: place.placeId,
      lat: place.lat,
      lng: place.lng,
      name: place.name,
      categories: place.categories,
      description: description,
      rating: rating,
    });
  }

  isValid() {
    return this.name.trim() && this.description.trim() && this.rating != 0;
  }
}
