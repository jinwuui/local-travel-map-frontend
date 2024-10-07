import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const CONTENT_TYPE_JSON = "application/json";
const CONTENT_TYPE_MULTIPART = "multipart/form-data";
const ACCESS_TOKEN = "accessToken";
const AUTHORIZATION = "Authorization";

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

  return client;
};

const apiClient = createApiClient(CONTENT_TYPE_JSON);
const multipartClient = createApiClient(CONTENT_TYPE_MULTIPART);

export { apiClient, multipartClient };
