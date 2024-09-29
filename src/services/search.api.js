import { apiClient } from "./axiosClient";

export default class SearchAPIService {
  constructor() {
    this.axiosInstance = apiClient;
  }

  async _makeApiCall(config) {
    try {
      const { data } = await this.axiosInstance.request(config);
      return data;
    } catch (error) {
      console.error("API 호출 오류:", error);
      throw error;
    }
  }

  async autocomplete(keyword) {
    return await this._makeApiCall({
      method: "get",
      url: "/searches/autocomplete",
      params: { keyword },
    });
  }
}

export const searchAPI = new SearchAPIService();
