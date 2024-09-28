import { apiClient, multipartClient } from "./axiosClient";

export default class PlaceAPIService {
  constructor() {
    this.axiosInstance = apiClient;
    this.multipartInstance = multipartClient;
  }

  async _axiosCall(config) {
    try {
      const { data } = await this.axiosInstance.request(config);
      return data;
    } catch (error) {
      console.error("API 호출 오류:", error);
      throw error;
    }
  }

  async _axiosMultipartCall(config) {
    try {
      const { data } = await this.multipartInstance.request(config);
      return data;
    } catch (error) {
      console.error("API 호출 오류:", error);
      throw error;
    }
  }

  async addPlace(placeFormData) {
    console.log("addPlace", placeFormData);
    return this._axiosMultipartCall({
      url: "/places",
      headers: { accessToken: true },
      method: "post",
      data: placeFormData,
    });
  }

  // TODO: 브라우저 창에 보이는 경도/위도 값으로 조회 가능하도록 변경
  async fetchPlaces(params) {
    return this._axiosCall({
      url: "/places",
      method: "get",
      headers: { accessToken: true },
      params: params,
    });
  }

  async fetchBookmarkPlaces(userId) {
    if (!userId) return;

    return this._axiosCall({
      method: "get",
      url: "/bookmarks",
      headers: { Authorization: `Bearer ${userId}` },
    });
  }

  async fetchPlace(placeId) {
    return this._axiosCall({
      url: `/places/${placeId}`,
      method: "get",
      headers: { accessToken: true },
    });
  }

  async updatePlace(placeId, place, password) {
    return this._axiosCall({
      method: "put",
      url: `/${placeId}`,
      data: { place: place, password: password },
    });
  }

  async deletePlace(placeId, password) {
    return this._axiosCall({
      method: "delete",
      url: `/${placeId}`,
      data: password,
    });
  }
}

export const placeAPI = new PlaceAPIService();
