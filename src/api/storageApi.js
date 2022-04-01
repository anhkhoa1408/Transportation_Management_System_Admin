import axiosClient from "./axiosClient";

class StorageApi {
  getList = (params) => {
    const url = process.env.MAIN_URL.concat("/storages");
    return axiosClient.get(url, { params });
  };
  getDetail = (id) => {
    const url = process.env.MAIN_URL.concat(`/storages/${id}`);
    return axiosClient.get(url);
  };
  getCount = () => {
    const url = process.env.MAIN_URL.concat("/storages/count");
    return axiosClient.get(url);
  };
  update = (id, data) => {
    const url = process.env.MAIN_URL.concat(`/storages/${id}`);
    return axiosClient.put(url, data);
  };
  create = (data) => {
    const url = process.env.MAIN_URL.concat(`/storages`);
    return axiosClient.post(url, data);
  };
  getImport = (params) => {
    const url = process.env.MAIN_URL.concat("/imports");
    return axiosClient.get(url, { params });
  };
}

const storageApi = new StorageApi();
export default storageApi;
