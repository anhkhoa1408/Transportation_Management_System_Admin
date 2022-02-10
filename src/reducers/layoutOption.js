import { TOGGLE_SIDEBAR } from "../constants/types";

const initialState = {
  toggleSideBar: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        toggleSideBar: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
