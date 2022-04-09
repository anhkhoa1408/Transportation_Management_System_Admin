import axiosClient from "./axiosClient";

class ShipmentApi {
  getList = (params) => {
    const url = process.env.MAIN_URL.concat("/shipments");
    return axiosClient.get(url, { params });
  };
  getDetail = (id) => {
    const url = process.env.MAIN_URL.concat(`/shipments/${id}`);
    return axiosClient.get(url);
  };
  getCount = () => {
    const url = process.env.MAIN_URL.concat("/shipments/count");
    return axiosClient.get(url);
  };
  update = (id, data) => {
    const url = process.env.MAIN_URL.concat(`/shipments/${id}`);
    return axiosClient.put(url, data);
  };
  create = (data) => {
    const url = process.env.MAIN_URL.concat(`/shipments`);
    return axiosClient.post(url, data);
  };
  getItemList = (params) => {
    const url = process.env.MAIN_URL.concat("/shipment-items");
    return axiosClient.get(url, { params });
  }
}

const shipmentApi = new ShipmentApi();
export default shipmentApi;
