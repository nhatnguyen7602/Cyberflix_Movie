import {} from "../../Services/localServices";
import { SET_DAT_VE } from "../constants/constantCheckout";

const initialState = {
  // thông tin liên quan đến checkout ở đây
  danhSachGheDangDat: [],
};

export const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DAT_VE:
      // cập nhật lại danhSachGheDangDat[]
      // nếu ghế chưa được chọn
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
      );
      //nếu ghế đã được chọn thì xóa nó đi
      if (index != -1) {
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.gheDuocChon);
      }
      // gán lại danhSachGheDangDat - lưu về state
      state.danhSachGheDangDat = danhSachGheCapNhat;
      return { ...state };
    default:
      return state;
  }
};
