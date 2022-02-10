import { TOGGLE_SIDEBAR } from "../constants/types";

export const toggleSidebar = (toggle) => {
  return {
    type: TOGGLE_SIDEBAR,
    payload: toggle,
  };
};
