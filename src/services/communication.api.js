import { apiClient } from "./axiosClient";

export default class CommunicationAPIService {
  constructor() {
    this.axiosInstance = apiClient;
  }

  async _makeApiCall(config) {
    try {
      const { data } = await this.axiosInstance.request(config);
      return data;
    } catch (e) {
      console.error("API 호출 오류:", e);
      throw e;
    }
  }

  async fetchAnnouncements() {
    return await this._makeApiCall({
      method: "get",
      url: "/communications/announcements",
    });
  }

  async submitFeedback(feedback) {
    return await this._makeApiCall({
      method: "post",
      url: "/communications/feedbacks",
      data: feedback,
    });
  }
}

export const communicationAPI = new CommunicationAPIService();
