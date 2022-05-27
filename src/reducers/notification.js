import { SAVE_NOTI_SUCCESS, SAVE_NOTI_ERROR, ADD_NOTI } from "../constants/types";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_NOTI_SUCCESS:
      return action.payload;
    case SAVE_NOTI_ERROR:
      return [...state];
    case ADD_NOTI:
      return [action.payload, ...state];
    default:
      return state;
  }
};
export default reducer;
