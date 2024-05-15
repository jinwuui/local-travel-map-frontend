export default class PlaceMarker {
  constructor({ placeId, lat, lng, category }) {
    this.placeId = placeId;
    this.lat = lat;
    this.lng = lng;
    this.category = category;
  }
}
