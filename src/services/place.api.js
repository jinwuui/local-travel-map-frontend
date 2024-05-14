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

  async getPlace(placeId) {
    return this._axiosCall({ method: "get", url: `/${placeId}` });
  }

  async postPlace(place) {
    return this._axiosCall({ method: "post", data: JSON.stringify(place) });
  }
}

export const placeAPI = new PlaceAPIService();
