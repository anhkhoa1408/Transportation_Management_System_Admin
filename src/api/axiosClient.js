import axios from "axios";
import queryString from "query-string";
import getToken from "./token";

const axiosClient = axios.create({
  baseURL: process.env.MAIN_URL,
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(async config => {
  let token = await getToken();
  if (token !== '')
    config.headers = {
      ...config.headers,
      Authorization: 'Bearer ' + token,
      Accept: '*/*',
    };
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);
export default axiosClient;
