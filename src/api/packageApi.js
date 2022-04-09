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
  getListInStore = (params) => {
    const url = process.env.MAIN_URL.concat("/packages/in-storage");
    return axiosClient.get(url, { params });
  };
  getUnArrange = (id, params) => {
    const url = process.env.MAIN_URL.concat(`/packages/unarrange/${id}`);
    return axiosClient.get(url, { params });
  }
  getUnCollect = (id, params) => {
    const url = process.env.MAIN_URL.concat(`/packages/uncollect/${id}`);
    return axiosClient.get(url, { params });
  }
}

const packageApi = new PackageApi();
export default packageApi;
