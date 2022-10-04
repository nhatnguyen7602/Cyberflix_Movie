import React from "react";
import { useSelector } from "react-redux";
export default function BillCheck({ data }) {
  console.log("data billcheck - showDetail: ", data);
  //2. lấy thông tin người dùng
  // lấy thông tin từ store về state bằng useSelector
  const user = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  console.log("data billcheck - user: ", user);
  return (
    <div className='billCheck col-span-4 w-1/4 border rounded-lg '>
      <h3 className='text-xl text-center text-red-800 pt-3'>
        {" "}
        Tổng tiền: 0 Đ{" "}
      </h3>
      <hr />
      <h3 className='text-m text-center text-rose-500'>
        Tên phim: {data.thongTinPhim?.tenPhim}
      </h3>
      <p className='text-m text-center text-rose-500'>
        {" "}
        Địa điểm: {data.thongTinPhim?.diaChi}
      </p>
      <p className='text-m text-center text-rose-500'>
        {" "}
        Ngày chiếu: {data.thongTinPhim?.ngayChieu} - {data.thongTinPhim?.tenRap}{" "}
      </p>
      <hr />
      <div className='grid text-center text-black'>
        <p>Thông tin người dùng: {user.hoTen}</p>
        <p>Số điện thoại: {user.soDT}</p>
        <p>Email: {user.email}</p>
      </div>
      <hr />
      <div className='grid grid-cols-2  '>
        <p className='text-m text-center text-rose-500'> Số ghế: </p>
        <p className='text-m text-center text-red-800'> Tiền: </p>
      </div>
    </div>
  );
}
