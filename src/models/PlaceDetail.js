import Place from "@/models/Place";

export default class PlaceDetail extends Place {
  constructor({
    placeId,
    lat,
    lng,
    category,
    name = "",
    description = "",
    rating = 0,
  }) {
    super({ placeId: placeId, lat: lat, lng: lng, category: category });
    this.name = name;
    this.description = description;
    this.rating = rating;
  }

  static fromPlace({ marker, name, description, rating }) {
    return new PlaceDetail({
      placeId: marker.placeId,
      lat: marker.lat,
      lng: marker.lng,
      category: marker.category,
      name: name,
      description: description,
      rating: rating,
    });
  }

  isValid() {
    return this.name.trim() && this.description.trim() && this.rating != 0;
  }
}
