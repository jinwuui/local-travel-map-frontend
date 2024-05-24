import axios from "axios";

export default class SearchAPIService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL + "/search",
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
      return error;
    }
  }

  async autocomplete(query) {
    return await this._axiosCall({
      method: "get",
      url: "/autocomplete",
      params: { query: query },
    });
  }

  async search(query) {
    return await this._axiosCall({
      method: "get",
      params: { query: query },
    });
  }
}

export const searchAPI = new SearchAPIService();
