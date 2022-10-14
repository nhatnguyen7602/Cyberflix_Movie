import axios from "axios";
import { BASE_URL, https, TOKEN_CYBERSOFT } from "./configURL";
import { localServ } from "./localServices";

// tạo obj chứa các axios gọi api liên quan đến phim

export const moviesServ = {
  // gọi data tạo list phim show trên main page
  getListMovie: (tenPhim = "") => {
    if (tenPhim == "") {
      let uri = "/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03";
      // truyền uri cho axios.create tạo từ biến https bằng cú pháp https.get(uri) => hoàn thành cú pháp axios
      return https.get(uri);
    } else {
      // Lấy list phim search
      let uri = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03&tenPhim=${tenPhim}`;

      return https.get(uri);
    }
  },
  // gọi data tạo list hiển thị phim theo rạp
  getMovieByTheater: () => {
    let uri = "/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03";
    // truyền uri cho axios.create tạo từ biến https bằng cú pháp https.get(uri) => hoàn thành cú pháp axios
    return https.get(uri);
  },
  // gọi data tạo list hiển thị banner carousel
  getListMovieCarousel: () => {
    let uri = "api/QuanLyPhim/LayDanhSachBanner";
    // truyền uri cho axios.create tạo từ biến https bằng cú pháp https.get(uri) => hoàn thành cú pháp axios
    return https.get(uri);
  },
  // gọi data lấy detail movie cho trang detail movie
  getDetailMovie: (maPhim) => {
    let uri = `api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
    // truyền uri cho axios.create tạo từ biến https bằng cú pháp https.get(uri) => hoàn thành cú pháp axios
    return https.get(uri);
  },
  // gọi data lấy thông tin lịch chiếu theo phim cho trang detail movie
  getScheduleMovie: (maPhim) => {
    let uri = `api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
    // truyền uri cho axios.create tạo từ biến https bằng cú pháp https.get(uri) => hoàn thành cú pháp axios
    return https.get(uri);
  },
  // gọi data lấy thông tin lịch chiếu theo mã lịch chiếu cho trang checkout
  getShow: (maLichChieu) => {
    let uri = `api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
    // truyền uri cho axios.create tạo từ biến https bằng cú pháp https.get(uri) => hoàn thành cú pháp axios
    return https.get(uri);
  },
  // xóa phim
  deleteMovie: (maPhim) => {
    return https.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },
  // thêm phim
  addMovie: (phim) => {
    return https.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, phim);
  },

  /////////////////////////////////////////////////////////////////////

  // Gọi api thêm phim
  postAddMovie: (data) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyPhim/ThemPhimUploadHinh`,
      method: "POST",
      data,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Gọi api cập nhật phim
  updateMovie: (data) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyPhim/CapNhatPhimUpload`,
      method: "POST",
      data,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "bearer " + localServ.user.get()?.accessToken,
      },
    });
  },

  deleteMovie: (id) => {
    let uri = `/api/QuanLyPhim/XoaPhim?MaPhim=${id}`;

    return https.delete(uri);
  },

  getInfoTheaterSystems: () => {
    let uri = `/api/QuanLyRap/LayThongTinHeThongRap`;

    return https.get(uri);
  },

  getInfoTheater: (idSystem) => {
    let uri = `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${idSystem}`;

    return https.get(uri);
  },

  createScheduleFilm: (data) => {
    return axios({
      url: `${BASE_URL}/api/QuanLyDatVe/TaoLichChieu`,
      method: "POST",
      data,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "bearer " + localServ.user.get()?.accessToken,
      },
    });
  },
};
