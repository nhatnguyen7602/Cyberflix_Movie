// Action sử dụng thunk - gọi api sau khi dispatch
import { userServ } from "../../Services/userServies";
import { SET_USER, SET_USER_REGIS } from "../constants/constantUser";
import { localServ } from "../../Services/localServices";
// tạo hàm setUserLoginSuccess chứa dữ liệu dispatch
const setUserLoginSuccess = (successValue) => {
  return {
    type: SET_USER,
    payload: successValue,
  };
};
const setUserRegisSuccess = (successValue) => {
  return {
    type: SET_USER_REGIS,
    payload: successValue,
  };
};
// tạo hàm xử lí action có api *__Serv
// truyền 2 callback onLoginSuccess, onLoginFail xử lí thêm các trường hợp phía sau
export const setUserLoginActionServ = (
  dataLogin,
  onLoginSuccess,
  onLoginFail
) => {
  return (dispatch) => {
    // gọi api
    userServ
      .postLogin(dataLogin)
      //
      .then((res) => {
        console.log("data User: ", res);
        // lưu vào USER storage
        localServ.user.setItem(res.data.content);
        // dispatch dữ liệu
        dispatch(setUserLoginSuccess(res.data.content));
        onLoginSuccess();
      })
      .catch((err) => {
        console.log(err);
        onLoginFail();
      });
  };
};
export const setUserRegisActionServ = (
  dataRegis,
  onRegisSuccess,
  onRegisFail
) => {
  return (dispatch) => {
    // gọi api
    userServ
      .postRegis(dataRegis)
      //
      .then((res) => {
        console.log("data Regis: ", res);
        // lưu vào USER storage
        localServ.user.setItemRegis(res.data.content);
        // dispatch dữ liệu
        dispatch(setUserRegisSuccess(res.data.content));
        onRegisSuccess();
      })
      .catch((err) => {
        console.log(err);
        onRegisFail();
      });
  };
};
export const setUserEditActionServ = (
  dataEdit,
  onRegisSuccess,
  onRegisFail
) => {
  return (dispatch) => {
    // gọi api
    userServ
      .putEditUser(dataEdit)
      //
      .then((res) => {
        console.log("data Regis: ", res);
        // lưu vào USER storage
        localServ.user.setItemRegis(res.data.content);
        // dispatch dữ liệu
        dispatch(setUserRegisSuccess(res.data.content));
        onRegisSuccess();
      })
      .catch((err) => {
        console.log(err);
        onRegisFail();
      });
  };
};
