import { combineReducers } from "redux";
import { CLEAN_STORE } from "../constants/types";
import localStorage from "redux-persist/lib/storage";
import { persistor } from "../config/configureStore";
import userInfo from "./userInfo";
import layoutOption from "./layoutOption";
import notification from "./notification"

const appReducer = combineReducers({
  userInfo: userInfo,
  layoutOption: layoutOption,
  notification: notification
});

const rootReducer = (state, action) => {
  if (action.type === CLEAN_STORE) {
    state = undefined;
    localStorage.removeItem("persist:root");
    setTimeout(() => persistor.purge(), 200);
  }
  return appReducer(state, action);
};

export default rootReducer;
