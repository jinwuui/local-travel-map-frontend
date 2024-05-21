export default class Place {
  constructor({ placeId, lat, lng, name, categories }) {
    this.placeId = placeId;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.categories = categories;
  }
}
