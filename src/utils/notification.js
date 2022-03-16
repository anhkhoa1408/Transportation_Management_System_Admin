import { toast, Zoom } from "react-toastify";

const successNotify = (message) => {
  toast.success(message, {
    containerId: "A",
    transition: Zoom,
  });
};

const errorNotify = (message) => {
  toast.error(message, {
    containerId: "A",
    transition: Zoom,
  });
};

export { successNotify, errorNotify };
