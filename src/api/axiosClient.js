// import axios from "axios";
// import queryString from "query-string";
// import getToken from "./token";

// const axiosClient = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     "content-type": "application/json",
//   },
//   paramsSerializer: (params) => {
//     return queryString.stringify(params);
//   },
// });

// axiosClient.interceptors.request.use(async (config) => {
//   let token = await getToken();
//   if (token !== "")
//     config.headers = {
//       Authorization: "Bearer " + token,
//     };
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     // Handle errors
//     throw error;
//   }
// );
// export default axiosClient;
