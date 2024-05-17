export default class PlaceMarker {
  constructor({ placeId, lat, lng, name, category }) {
    this.placeId = placeId;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.category = category;
  }
}
