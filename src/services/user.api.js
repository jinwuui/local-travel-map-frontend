import axios from "axios";

export default class UserAPIService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL + "/users",
      headers: { "Content-Type": "application/json" },
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

  async login(loginInfo) {
    return this._axiosCall({
      method: "post",
      data: loginInfo,
    });
  }

  async toggleFavoritePlace(userId, placeId) {
    if (!userId) return;

    return this._axiosCall({
      method: "post",
      headers: { Authorization: `Bearer ${userId}` },
      url: `/favorites/${placeId}`,
    });
  }
}

export const userAPI = new UserAPIService();
