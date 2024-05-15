import axios from "axios";

export default class PlaceAPIService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL + "/places",
      headers: { "Content-Type": "application/json" },
    });
  }

  async _axiosCall(config) {
    try {
      const { data } = await this.axiosInstance.request(config);
      return [null, data];
    } catch (error) {
      return [error];
    }
  }

  async addPlace(place) {
    return this._axiosCall({ method: "post", data: JSON.stringify(place) });
  }

  // TODO: 브라우저 창에 보이는 경도/위도 값으로 조회 가능하도록 변경
  async fetchPlaceMarkers(category = "default") {
    return this._axiosCall({
      method: "get",
      params: {
        category: category,
      },
    });
  }

  async fetchPlaceDetails(placeId) {
    return this._axiosCall({ method: "get", url: `/${placeId}` });
  }

  async updatePlace(placeId, place, password) {
    return this._axiosCall({
      method: "put",
      url: `/${placeId}`,
      data: JSON.stringify({ place: place, password: password }),
    });
  }

  async deletePlace(placeId, password) {
    return this._axiosCall({
      method: "delete",
      url: `/${placeId}`,
      data: JSON.stringify(password),
    });
  }
}

export const placeAPI = new PlaceAPIService();
