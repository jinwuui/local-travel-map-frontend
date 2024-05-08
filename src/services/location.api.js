import axios from "axios";

export default class LocationAPIService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL + "/locations",
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

  async getLocation(locationId) {
    return this._axiosCall({ method: "get", url: `/${locationId}` });
  }

  async postLocation(location) {
    return this._axiosCall({ method: "post", data: location });
  }
}

export const locationAPI = new LocationAPIService();
