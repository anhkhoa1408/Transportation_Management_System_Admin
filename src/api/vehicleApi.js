import axiosClient from "./axiosClient";

class VehicleApi {
  getList = (params) => {
    const url = process.env.MAIN_URL.concat("/cars");
    return axiosClient.get(url, { params });
  };
  getDetail = (id) => {
    const url = process.env.MAIN_URL.concat(`/cars/${id}`);
    return axiosClient.get(url);
  };
  getCount = () => {
    const url = process.env.MAIN_URL.concat("/cars/count");
    return axiosClient.get(url);
  };
  update = (id, data) => {
    const url = process.env.MAIN_URL.concat(`/cars/${id}`);
    return axiosClient.put(url, data);
  };
  getBroken = (data) => {
    const url = process.env.MAIN_URL.concat(`/car-brokens`);
    return axiosClient.get(url, data);
  };
}

const vehicleApi = new VehicleApi();
export default vehicleApi;
