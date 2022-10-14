import { TOKEN_CYBERSOFT, BASE_URL } from "./configURL";
import { https } from "./configURL";
import { localServ } from "./localServices";
import axios from "axios";
// tạo obj chứa các axios gọi api liên quan đến checkout
export const checkOutServ = {
  // truyền data chi tiết đặt vé lên server
  postDatVeOld: (dataDatVe) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyDatVe/DatVe`,
      method: "POST",
      data: dataDatVe,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localServ.user.get()?.accessToken,
        // Authorization: localServ.user.get()?.accessToken,
      },
    });
  },
  // truyền data chi tiết đặt vé lên server
  postDatVe: (dataDatVe) => {
    let uri = "/api/QuanLyDatVe/DatVe";
    let data = dataDatVe;
    // truyền uri cho axios.create tạo từ biến https bằng cú pháp https.get(uri) => hoàn thành cú pháp axios
    return https.post(uri, data);
  },
};
