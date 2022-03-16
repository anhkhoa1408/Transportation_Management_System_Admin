import axiosClient from "./axiosClient";

class OrderApi {
  getList = (params) => {
    const url = process.env.MAIN_URL.concat("/orders/admin");
    return axiosClient.get(url, { params });
  };
}

const orderApi = new OrderApi();
export default orderApi;
