import axios from "axios";

export default class PlaceAPIService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL + "/places",
      headers: { "Content-Type": "application/json" },
    });

    this.multipartInstance = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL + "/places",
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async _axiosCall(config) {
    try {
      const { data } = await this.axiosInstance.request(config);
      return data;
    } catch (error) {
      return error;
    }
  }

  async _axiosMultipartCall(config) {
    try {
      const { data } = await this.multipartInstance.request(config);
      return data;
    } catch (error) {
      return error;
    }
  }

  async addPlace(placeFormData) {
    return this._axiosMultipartCall({
      method: "post",
      data: placeFormData,
    });
  }

  // TODO: 브라우저 창에 보이는 경도/위도 값으로 조회 가능하도록 변경
  async fetchPlaces(params) {
    const config = { method: "get" };
    if (params) {
      config.params = params;
    }

    return this._axiosCall(config);
  }

  async fetchPlace(placeId) {
    return this._axiosCall({ method: "get", url: `/${placeId}` });
  }

  async fetchPlaceDetails(placeId) {
    return this._axiosCall({ method: "get", url: `/${placeId}/details` });
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
