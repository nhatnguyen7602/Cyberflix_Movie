import {} from "../../Services/localServices";
import { SET_MOVIE } from "../constants/constantUser";

const initialState = {
  // lấy thông tin user ở localStorage từ localServ
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIE:
      state.movieInfor = action.payload;
      return { ...state };
    default:
      return state;
  }
};
