import {} from "../../Services/localServices";
import { SET_CHECKOUT } from "../constants/constantUser";

const initialState = {
  // thông tin liên quan đến checkout ở đây
  danhSachGheDangDat: [],
};

export const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECKOUT:
      state.checkOut = action.payload;
      return { ...state };
    default:
      return state;
  }
};
