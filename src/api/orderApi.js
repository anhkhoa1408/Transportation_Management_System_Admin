import axiosClient from "./axiosClient";

class OrderApi {
  getList = (params) => {
    const url = process.env.MAIN_URL.concat("/orders");
    return axiosClient.get(url, { params });
  };
  getDetail = (id) => {
    const url = process.env.MAIN_URL.concat(`/orders/${id}`);
    return axiosClient.get(url);
  };
  getCount = () => {
    const url = process.env.MAIN_URL.concat("/orders/count");
    return axiosClient.get(url);
  };
  update = (id, data) => {
    const url = process.env.MAIN_URL.concat(`/orders/${id}`);
    return axiosClient.put(url, data);
  };
}

const orderApi = new OrderApi();
export default orderApi;
