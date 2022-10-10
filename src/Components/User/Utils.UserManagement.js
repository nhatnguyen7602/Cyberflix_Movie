import { Tag } from "antd";

export const headColumns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Tên Khách hàng",
    dataIndex: "hoTen",
    key: "hoTen",
  },
  {
    title: "Tài khoản",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
  },
  {
    title: "Loại tài khoản",
    dataIndex: "maLoaiNguoiDung",
    key: "maLoaiNguoiDung",
    render: (text) => {
      if (text == "QuanTri") {
        return <Tag color='red'> Quản trị viên</Tag>;
      } else return <Tag color='green'> Khách hàng</Tag>;
    },
  },
  {
    title: "Số điện thoại",
    dataIndex: "soDT",
    key: "soDT",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
  },
];
