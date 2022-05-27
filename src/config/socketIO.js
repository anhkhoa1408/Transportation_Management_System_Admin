import io from "socket.io-client";
import { addNoti } from "../actions/actions";
import { store } from "./configureStore";
import { successNotify } from './../utils/notification'

export const socket = io(process.env.MAIN_URL);

export const startSocketIO = () => {
  socket.connect();

  socket.on("connect", () => {
    console.log("Connect socket ", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Disconnect socket");
  });

  socket.on("notification", (message) => {
    store.dispatch(addNoti(message))
    successNotify("Bạn có thông báo mới")
  });
};
