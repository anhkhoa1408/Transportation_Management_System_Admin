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
}

const vehicleApi = new VehicleApi();
export default vehicleApi;
