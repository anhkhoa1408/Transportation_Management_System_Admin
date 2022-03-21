import axiosClient from "./axiosClient";

class ReportApi {
  getList = (params) => {
    const url = process.env.MAIN_URL.concat("/reports");
    return axiosClient.get(url, { params });
  };
  getDetail = (id) => {
    const url = process.env.MAIN_URL.concat(`/reports/${id}`);
    return axiosClient.get(url);
  };
  getCount = () => {
    const url = process.env.MAIN_URL.concat("/reports/count");
    return axiosClient.get(url);
  };
  update = (id, data) => {
    const url = process.env.MAIN_URL.concat(`/reports/${id}`);
    return axiosClient.put(url, data);
  };
}

const reportApi = new ReportApi();
export default reportApi;
