
export const headColumns = [
  {
    title: "Tên Phim",
    dataIndex: "tenPhim",
    key: "tenPhim",
  },
  {
    title: "Hình Ảnh",
    dataIndex: "hinhAnh",
    key: "hinhAnh",
    render: (hinhAnh) => {
      return <img style={{}} src={hinhAnh}></img>;
    },
  },
  {
    title: "Mã nhóm",
    dataIndex: "maNhom",
    key: "maNhom",
  },
  {
    title: "Mô tả",
    dataIndex: "moTa",
    key: "moTa",
  },
  {
    title: "Ngày khởi chiếu",
    dataIndex: "ngayKhoiChieu",
    key: "ngayKhoiChieu",
  },

  {
    title: "Đánh giá",
    dataIndex: "danhGia",
    key: "danhGia",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
  },
];

// {
//     "maPhim": 10561,
//     "tenPhim": "Hạnh phúc mãi về sau",
//     "biDanh": "hanh-phuc-mai-ve-sau",
//     "trailer": "https://youtu.be/K7AL2OARpTo",
//     "hinhAnh": "http://movie0706.cybersoft.edu.vn/hinhanh/hanh-phuc-mai-ve-sau_gp03.jpg",
//     "moTa": "Tessa và Hardin yêu nhau bất chấp. Nhưng khi một tiết lộ động trời và một mất mát bi thảm đẩy họ đến bờ vực, liệu mối quan hệ của cả hai có thể tiếp tục?",
//     "maNhom": "GP03",
//     "ngayKhoiChieu": "2022-10-10T17:13:31.583",
//     "danhGia": 10
//   },
