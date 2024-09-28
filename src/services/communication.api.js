import { apiClient } from "./axiosClient";

export default class CommunicationAPIService {
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

  async fetchAnnouncements() {
    return this._makeApiCall({
      method: "get",
      url: "/communications/announcements",
      headers: { accessToken: true },
    });
  }

  async submitFeedback(feedback) {
    return this._makeApiCall({
      method: "post",
      url: "/communications/feedbacks",
      headers: { accessToken: true },
      data: feedback,
    });
  }
}

export const communicationAPI = new CommunicationAPIService();
