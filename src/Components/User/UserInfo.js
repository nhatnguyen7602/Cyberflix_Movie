import React from "react";
import bg_animate4 from "../../Assets/bg_animate4.json";
import Lottie from "lottie-react";
import { Descriptions, Tag } from "antd";
export default function UserInfo({ userInfo }) {
  let render = (text) => {
    if (text == "QuanTri") {
      return <Tag color='red'> Quản trị viên</Tag>;
    } else return <Tag color='green'> Khách hàng</Tag>;
  };
  let loaiNguoiDung = userInfo.maLoaiNguoiDung;
  return (
    <div className='w-full flex items-start justify-center gap-10 mx-auto'>
      <div className='descUser w-1/2'>
        <Descriptions title={`Tài Khoản: ${userInfo.taiKhoan}`}>
          <Descriptions.Item span={3} label='Họ tên:'>
            {userInfo.hoTen}
          </Descriptions.Item>
          <Descriptions.Item span={3} label='Số điện thoại:'>
            {userInfo.soDT}
          </Descriptions.Item>
          <Descriptions.Item span={3} label='Loại người dùng: '>
            {render(loaiNguoiDung)}
          </Descriptions.Item>
          <Descriptions.Item span={3} label='Email: '>
            {userInfo.email}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className='w-1/2 h-full'>
        <Lottie animationData={bg_animate4}></Lottie>
      </div>
    </div>
  );
}
