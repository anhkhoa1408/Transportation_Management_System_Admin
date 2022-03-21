import axiosClient from "./axiosClient";

class PackageApi {
  getList = (params) => {
    console.log(params)
    const url = process.env.MAIN_URL.concat("/packages");
    return axiosClient.get(url, { params });
  };
  getDetail = (id) => {
    const url = process.env.MAIN_URL.concat(`/packages/${id}`);
    return axiosClient.get(url);
  };
  getCount = () => {
    const url = process.env.MAIN_URL.concat("/packages/count");
    return axiosClient.get(url);
  };
  update = (id, data) => {
    const url = process.env.MAIN_URL.concat(`/packages/${id}`);
    return axiosClient.put(url, data);
  };
}

const packageApi = new PackageApi();
export default packageApi;
