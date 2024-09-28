import { apiClient, multipartClient } from "./axiosClient";

export default class PlaceAPIService {
  constructor() {
    this.axiosInstance = apiClient;
    this.multipartInstance = multipartClient;
  }

  async _makeApiCall(config, instance = this.axiosInstance) {
    try {
      const { data } = await instance.request(config);
      return data;
    } catch (error) {
      console.error("API 호출 오류:", error);
      throw error;
    }
  }

  async addPlace(placeFormData) {
    console.log("addPlace", placeFormData);
    return this._makeApiCall(
      {
        method: "post",
        url: "/places",
        headers: { accessToken: true },
        data: placeFormData,
      },
      this.multipartInstance
    );
  }

  // TODO: 브라우저 창에 보이는 경도/위도 값으로 조회 가능하도록 변경
  async fetchPlaces(params) {
    return this._makeApiCall({
      method: "get",
      url: "/places",
      headers: { accessToken: true },
      params,
    });
  }

  async fetchPlace(placeId) {
    return this._makeApiCall({
      method: "get",
      url: `/places/${placeId}`,
      headers: { accessToken: true },
    });
  }

  async fetchBookmarkPlaces() {
    return this._makeApiCall({
      method: "get",
      url: "/places/bookmarks",
      headers: { accessToken: true },
    });
  }
}

export const placeAPI = new PlaceAPIService();
