import {
  SAVE_USER_INFO,
  SAVE_USER_INFO_SUCCESS,
  SAVE_USER_INFO_ERROR,
} from "../constants/types";

const initialState = {
  // isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case SAVE_USER_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case SAVE_USER_INFO_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default reducer;
