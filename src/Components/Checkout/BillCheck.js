import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import modelDataDatVe from "../../models/dataDatve";
import { actionPostDatVe } from "../../Redux/actions/actionCheckout";
import { useDispatch } from "react-redux";
export default function BillCheck({ data }) {
  // lấy mã lichChieu
  const maLichChieu = useParams();
  //1. lấy thông tin ghế đang đặt từ reducer
  const { danhSachGheDangDat } = useSelector((state) => state.checkoutReducer);
  //1.1 gán state cho danhSachGheDangDat để render
  // Tạo biến useDispatch gửi giá trị thay đổi(action) cho isLoading lên store
  const dispatch = useDispatch();
  //3. hàm render số tiền và số ghế
  let renderBill = () => {
    let tongTien = 0;
    return (
      <div className='flex justify-center items-center flex-col'>
        <p> Các ghế đã chọn - Giá vé:</p>
        {danhSachGheDangDat?.map((ghe, index) => {
          tongTien += ghe.giaVe;
          return (
            <div
              key={index}
              className='flex justify-between items-center flex-row'>
              {" "}
              <p className='text-m text-center text-rose-500'>
                {" "}
                Ghế: {ghe.stt} - {ghe.giaVe}vnđ
              </p>
            </div>
          );
        })}
        <p className='text-m font-bold underline text-center text-red-800'>
          {" "}
          Tổng tiền: {tongTien}vnđ
        </p>
      </div>
    );
  };
  const user = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  return (
    <div className=' billCheck col-span-4 w-1/4 border rounded-lg p-3'>
      <h3 className=' text-xl text-center underline text-red-800'>
        {" "}
        THẺ THANH TOÁN{" "}
      </h3>
      <hr />
      <h3 className='text-m  text-center text-rose-500'>
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
      {renderBill()}
      <button
        className='w-full h-full'
        onClick={() => {
          const dataDatVe = new modelDataDatVe();
          dataDatVe.maLichChieu = maLichChieu.id;
          dataDatVe.danhSachVe = danhSachGheDangDat;
          console.log("dataDatVe: ", dataDatVe);
          dispatch(actionPostDatVe(dataDatVe));
        }}>
        <div className='rounded h-10 flex items-center justify-center bg-red-300 text-black hover:text-white hover:bg-red-500 transtion duration-300 cursor-pointer hover:shadow'>
          {" "}
          Đặt vé{" "}
        </div>
      </button>
    </div>
  );
}
