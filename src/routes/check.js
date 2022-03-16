import { store } from "../config/configureStore";
import { adminRouter } from "./routesList/adminRouter";
// import { storekeeperRouter } from "./routesList/storekeeperRouter";

function isLoggedIn() {
  let data = store.getState().userInfo;
  if (data.jwt) {
    return true;
  }
  return false;
}

function acceptedRoute() {
  let data = store.getState().userInfo;
  if (data && data.user) {
    switch (data.user.type) {
      case "Admin":
        return adminRouter;
      case "Stocker":
        return [];
      default:
        return [];
    }
  }
}

export { isLoggedIn, acceptedRoute };
