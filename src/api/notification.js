import axiosClient from "./axiosClient";

class NotiApi {
  getList = (params) => {
    const url = process.env.MAIN_URL.concat("/notifications");
    return axiosClient.get(url, { params });
  };
}
const notiApi = new NotiApi();
export default notiApi;
