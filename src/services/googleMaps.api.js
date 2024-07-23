import axios from "axios";

export default class GoogleMapsAPIService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_GOOGLE_MAPS_URL,
      headers: { "Content-Type": "application/json" },
      params: {
        fields: "id,location,displayName,shortFormattedAddress,googleMapsUri",
        key: process.env.VUE_APP_MAP_KEY,
      },
    });
  }

  async _axiosCall(config) {
    try {
      const { data } = await this.axiosInstance.request(config);
      return data;
    } catch (error) {
      // TODO: 에러 처리 로직 추가 (예: 로그 출력 또는 사용자 알림)
      console.error("API 호출 오류:", error);
      throw error;
    }
  }

  async getPlaceDetails(placeId) {
    return this._axiosCall({
      method: "get",
      url: `/places/${placeId}`,
    });
  }
}

export const googleMapsAPI = new GoogleMapsAPIService();
