import React from "react";
import bg_animate4 from "../../Assets/bg_animate4.json";
import Lottie from "lottie-react";
import { Descriptions } from "antd";
export default function UserInfo({ userInfo }) {
  let renderLoaiNguoiDung = (loaiNguoiDung) => {
    if (loaiNguoiDung == "khachHang") {
      return "Khách Hàng";
    } else {
      return "Admin";
    }
  };
  let loaiNguoiDung = userInfo.maLoaiNguoiDung;
  return (
    <div>
      <Descriptions title={`Tài Khoản: ${userInfo.taiKhoan}`}>
        <Descriptions.Item label='Họ tên:'>{userInfo.hoTen}</Descriptions.Item>
        <Descriptions.Item label='Số điện thoại:'>
          {userInfo.soDT}
        </Descriptions.Item>
        <Descriptions.Item label='Loại người dùng: '>
          {renderLoaiNguoiDung(loaiNguoiDung)}
        </Descriptions.Item>
        <Descriptions.Item label='Email: '>{userInfo.email}</Descriptions.Item>
      </Descriptions>
      <div className='w-1/4 h-full mx-auto'>
        <Lottie animationData={bg_animate4}></Lottie>
      </div>
    </div>
  );
}
