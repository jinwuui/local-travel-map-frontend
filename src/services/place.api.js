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
      method: "post",
      data: placeFormData,
    });
  }

  // TODO: 브라우저 창에 보이는 경도/위도 값으로 조회 가능하도록 변경
  async fetchPlaces(params, userId) {
    const config = { method: "get" };

    if (userId) {
      config.headers = {
        Authorization: `Bearer ${userId}`, // Authorization 헤더에 userId 추가
      };
    }
    if (params) {
      config.params = params;
    }

    return this._axiosCall(config);
  }

  async fetchFavoritePlaces(userId) {
    if (!userId) return;

    return this._axiosCall({
      method: "get",
      url: "/favorites",
      headers: { Authorization: `Bearer ${userId}` },
    });
  }

  async fetchPlace(placeId, userId) {
    const config = { method: "get", url: `/${placeId}` };

    if (userId) {
      config.headers = {
        Authorization: `Bearer ${userId}`, // Authorization 헤더에 userId 추가
      };
    }

    return this._axiosCall(config);
  }

  async fetchPlaceDetails(placeId, userId) {
    const config = { method: "get", url: `/${placeId}/details` };

    if (userId) {
      config.headers = {
        Authorization: `Bearer ${userId}`, // Authorization 헤더에 userId 추가
      };
    }

    return this._axiosCall(config);
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
