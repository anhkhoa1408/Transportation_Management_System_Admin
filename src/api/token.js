import { store } from "../config/configureStore";

const getToken = () => {
  let storeData = store.getState();
  if (storeData && storeData.userInfo && storeData.userInfo.jwt) {
    return storeData.userInfo.jwt;
  } else {
    return "";
  }
};

export default getToken;
