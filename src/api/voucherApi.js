import axiosClient from "./axiosClient";

class VoucherApi {
  getList = (params) => {
    const url = process.env.MAIN_URL.concat("/vouchers");
    return axiosClient.get(url, { params });
  };
  getDetail = (id) => {
    const url = process.env.MAIN_URL.concat(`/vouchers/${id}`);
    return axiosClient.get(url);
  };
  getCount = () => {
    const url = process.env.MAIN_URL.concat("/vouchers/count");
    return axiosClient.get(url);
  };
}

const voucherApi = new VoucherApi();
export default voucherApi;
