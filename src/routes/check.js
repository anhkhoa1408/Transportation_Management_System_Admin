import { store } from "../config/configureStore";
import { adminRouter } from "./routesList/adminRouter";
import { customerRouter } from "./routesList/customerRouter";
import { driverRouter } from "./routesList/driverRouter";
import { storekeeperRouter } from "./routesList/storekeeperRouter";

function isLoggedIn() {
  let data = store.getState().userInfo;
  if (data.jwt) {
    return true;
  }
  return false;
}

function acceptedRoute() {
  let data = store.getState().userInfo;
  if (data && data.user && data.user.role) {
    switch (data.user.role.name) {
      case "Admin":
        return adminRouter;
      case "Stocker":
        return storekeeperRouter;
      case "Driver":
        return driverRouter;
      case "Customer":
        return customerRouter;
      default:
        return [];
    }
  }
}
export { isLoggedIn, acceptedRoute };

