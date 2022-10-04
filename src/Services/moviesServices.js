import { https } from "./configURL";
// tạo obj chứa các axios gọi api liên quan đến phim

export const moviesServ = {
  // gọi data tạo list phim show trên main page
  getListMovie: () => {
    let uri = "/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03";
    // truyền uri cho axios.create tạo từ biến https bằng cú pháp https.get(uri) => hoàn thành cú pháp axios
    return https.get(uri);
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
};
