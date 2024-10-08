import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const CONTENT_TYPE_JSON = "application/json";
const CONTENT_TYPE_MULTIPART = "multipart/form-data";

const AUTHORIZATION = "Authorization";
const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

if (!BASE_URL) {
  throw new Error("BASE_URL 환경 변수가 설정되어 있지 않습니다.");
}

const createApiClient = (contentType) => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": contentType },
  });

  client.interceptors.request.use(
    (config) => {
      if (config.headers[ACCESS_TOKEN]) {
        config.headers.delete(ACCESS_TOKEN);

        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token) {
          config.headers[AUTHORIZATION] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (e) => Promise.reject(e)
  );

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (refreshToken) {
          try {
            const response = await axios.post(
              `${BASE_URL}/auth/refresh`,
              {},
              {
                headers: {
                  [AUTHORIZATION]: `Bearer ${refreshToken}`,
                },
              }
            );

            const newAccessToken = response.data.accessToken;
            localStorage.setItem(ACCESS_TOKEN, newAccessToken);
            error.config.headers[AUTHORIZATION] = `Bearer ${newAccessToken}`;

            return axios.request(error.config);
          } catch (refreshError) {
            console.error("토큰 새로고침 실패:", refreshError);
            return Promise.reject(refreshError);
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

const apiClient = createApiClient(CONTENT_TYPE_JSON);
const multipartClient = createApiClient(CONTENT_TYPE_MULTIPART);

export { apiClient, multipartClient };
