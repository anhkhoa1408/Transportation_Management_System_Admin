import axiosClient from "./axiosClient";

class HomeApi {
  getStatus = (params) => {
    const url = process.env.MAIN_URL.concat("/home-status")
    return axiosClient.get(url, { params })
  }
}

const homeApi = new HomeApi()
export default homeApi;