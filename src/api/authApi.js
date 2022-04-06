import axiosClient from "./axiosClient";

class AuthorApi {
  login = (data) => {
    const url = process.env.MAIN_URL.concat("/auth/local");
    return axiosClient.post(url, data);
  };
  register = (data) => {
    const url = process.env.MAIN_URL.concat("/auth/signup");
    return axiosClient.post(url, data);
  };
  update = (id, data) => {
    const url = process.env.MAIN_URL.concat(`/users/${id}`);
    return axiosClient.put(url, data);
  };
  changePassword = data => {
    const url = process.env.MAIN_URL.concat(`/auth/password/update`);
    return axiosClient.post(url, data);
  };
}
const authApi = new AuthorApi();
export default authApi;
