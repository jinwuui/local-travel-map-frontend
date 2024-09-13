import axios from "axios";

export default class AuthAPIService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL + "/auth",
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
  async signUp(signUpInfo) {
    return this._axiosCall({
      method: "post",
      url: "/signup",
      data: signUpInfo,
    });
  }

  async login(loginInfo) {
    return this._axiosCall({
      method: "post",
      url: "/login",
      data: loginInfo,
    });
  }
}

export const authAPI = new AuthAPIService();
