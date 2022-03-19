import axiosClient from "./axiosClient";

class UserApi {
  getStaffs = (params) => {
    const url = process.env.MAIN_URL.concat("/staffs")
    return axiosClient.get(url, { params })
  }
  getCustomers = (params) => {
    const url = process.env.MAIN_URL.concat("/customers")
    return axiosClient.get(url, { params })
  }
}

const userApi = new UserApi()
export default userApi;