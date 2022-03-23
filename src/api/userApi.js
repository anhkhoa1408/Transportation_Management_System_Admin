import axiosClient from "./axiosClient";

class UserApi {
  getStaffs = (params) => {
    const url = process.env.MAIN_URL.concat("/staffs");
    return axiosClient.get(url, { params });
  };
  getCustomers = (params) => {
    const url = process.env.MAIN_URL.concat("/customers");
    return axiosClient.get(url, { params });
  };
  staffDetail = (id) => {
    const url = process.env.MAIN_URL.concat(`/users/${id}`);
    return axiosClient.get(url);
  };
  customerDetail = (id) => {
    const url = process.env.MAIN_URL.concat(`/users/${id}`);
    return axiosClient.get(url);
  };
  update = (id, data) => {
    const url = process.env.MAIN_URL.concat(`/users/${id}`);
    return axiosClient.put(url, data);
  };
  updateAvatar = async (avatar, id = "", avaId = "") => {
    const url = process.env.MAIN_URL.concat("/users/avatar");
    let formData = new FormData();
    formData.append("avatar", new File([avatar], avatar.name, { type: avatar.type }));
    formData.append("userId", id);
    formData.append("avaId", avaId);
    return axiosClient.put(url, formData);
  };
}

const userApi = new UserApi();
export default userApi;
