import axios from "axios";

export default class CommunicationAPIService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL + "/communications",
      headers: { "Content-Type": "application/json" },
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

  async fetchAnnouncements(curVersionCode) {
    return await this._axiosCall({
      method: "get",
      params: { versionCode: curVersionCode },
    });
  }

  async submitFeedback(feedback) {
    return await this._axiosCall({
      method: "post",
      data: feedback,
    });
  }
}

export const communicationAPI = new CommunicationAPIService();
