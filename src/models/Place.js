import PlaceMarker from "./PlaceMarker";

export default class Place extends PlaceMarker {
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

  static fromMarkerAndDetails({ marker, name, description, rating }) {
    return new Place({
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
