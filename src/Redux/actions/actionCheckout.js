// Action ko sử dụng thunk - lấy dữ liệu từ data đã được gọi api trước đó
import { checkOutServ } from "../../Services/checkoutServices";
import { SET_DAT_VE } from "../constants/constantCheckout";
import { message } from "antd";
// action creator không có api
export const actionSetDatVe = (ghe) => {
  return {
    type: SET_DAT_VE,
    gheDuocChon: ghe,
  };
};
// action creator không có api
export const actionPostDatVe = (dataDatVe) => {
  return () => {
    // gọi api
    // đưa dataDatVe lên backend theo checkoutServ
    checkOutServ
      .postDatVeOld(dataDatVe)
      .then((res) => {
        console.log(res);
        message.success("Đặt vé thành công");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
