import axios from "axios";
import { localServ } from "./localServices";
import { https, https2 } from "./configURL";
import { BASE_URL, TOKEN_CYBERSOFT } from "./configURL";
export const userServ = {
  // lấy đata user
  postLogin: (dataLogin) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/DangNhap`,
      method: "POST",
      data: dataLogin,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  // lấy dữ liệu danh sách user
  getUserList: () => {
    return axios({
      // config url - bổ sung maNhom từ data localStorage trong localServ lưu về được từ việc gọi api trước đó
      url: `${BASE_URL}/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00`,
      // ${
      //   localServ.user.get()?.maNhom
      // }`
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  // xóa người dùng
  deleteUser: (taiKhoan) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      method: "DELETE",
      taiKhoan: taiKhoan,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization:
          "bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzNDU2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaG90YW5waGF0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJRdWFuVHJpIiwiaG90YW5waGF0QGdtYWlsLmNvbSIsIkdQMDQiXSwibmJmIjoxNjY1MDM2MjAxLCJleHAiOjE2NjUwMzk4MDF9.pWnIXF0ddgYanp8Qion49xM-k7APHrS2RQDZZnFAT-c",
      },
    });
  },
  // lấy dữ liệu thông tin user đăng nhập:
  getUser: () => {
    return axios({
      // config url - bổ sung maNguoiDung từ data localStorage trong localServ lưu về được từ việc gọi api trước đó
      url: `${BASE_URL}/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${
        localServ.user.get()?.taiKhoan
      }`,
    });
  },
  // lấy dữ liệu thông tin user đăng ký:
  postRegis: (dataRegis) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/DangKy`,
      method: "POST",
      data: dataRegis,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        // Authorization:
        //   "Bearer " +
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzNDU2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaG90YW5waGF0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJRdWFuVHJpIiwiaG90YW5waGF0QGdtYWlsLmNvbSIsIkdQMDQiXSwibmJmIjoxNjY1MDM2MjAxLCJleHAiOjE2NjUwMzk4MDF9.pWnIXF0ddgYanp8Qion49xM-k7APHrS2RQDZZnFAT-c",
      },
    });
  },
  // lấy dữ liệu thông tin user bất kỳ:
  postUserInfo: (taiKhoan) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
      method: "POST",
      taiKhoan: taiKhoan,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzNDU2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaG90YW5waGF0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJRdWFuVHJpIiwiaG90YW5waGF0QGdtYWlsLmNvbSIsIkdQMDQiXSwibmJmIjoxNjY1MDM2MjAxLCJleHAiOjE2NjUwMzk4MDF9.pWnIXF0ddgYanp8Qion49xM-k7APHrS2RQDZZnFAT-c",
      },
    });
  },
  // cập nhật user
  putEditUser: (userEdit) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "PUT",
      nd: userEdit,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzNDU2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaG90YW5waGF0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJRdWFuVHJpIiwiaG90YW5waGF0QGdtYWlsLmNvbSIsIkdQMDQiXSwibmJmIjoxNjY1MDM2MjAxLCJleHAiOjE2NjUwMzk4MDF9.pWnIXF0ddgYanp8Qion49xM-k7APHrS2RQDZZnFAT-c",
      },
    });
  },
};

//
