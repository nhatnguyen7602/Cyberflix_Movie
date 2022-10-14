// Action ko sử dụng thunk - lấy dữ liệu từ data đã được gọi api trước đó
import { SET_LOADING_OFF, SET_LOADING_ON } from "../constants/constantSpinner";
// action creator không có api
export const setLoadingOnAction = () => {
  return {
    type: SET_LOADING_ON,
  };
};
export const setLoadingOffAction = () => {
  return {
    type: SET_LOADING_OFF,
  };
};
