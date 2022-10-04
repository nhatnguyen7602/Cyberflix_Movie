import { localServ } from "../../Services/localServices";
import { SET_USER } from "../constants/constantUser";

const initialState = {
  // lấy thông tin user ở localStorage từ localServ
  userInfor: localServ.user.getItem(),
};
  
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      state.userInfor = action.payload;
      return { ...state };
    default:
      return state;
  }
};
