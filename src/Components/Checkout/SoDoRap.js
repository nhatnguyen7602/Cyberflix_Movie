import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { actionSetDatVe, setDatVe } from "../../Redux/actions/actionCheckout";
export default function SoDoRap({ data }) {
  // useSelector lấy dữ liệu ghế khách chọn
  const { danhSachGheDangDat } = useSelector((state) => state.checkoutReducer);
  // gọi hàm useDispatch để gọi cú pháp dispatch dữ liệu từ redux thunk
  const dispatch = useDispatch();
  // hàm render sơ đồ ghế
  let renderSeat = () => {
    return data.danhSachGhe?.map((ghe, index) => {
      // tạo tên class hiển thị màu cho từng loại ghế
      let classGheDaDat = "bg-red-500";
      let classGheDangDat = "bg-rose-300";
      // kiểm tra ghế
      let classGhe = ghe.loaiGhe === "Vip" ? "bg-yellow-300" : "bg-green-300";
      // kiểm tra index của các phần tử trong mảng danhSachGheDangDat lấy từ store để render màu ghế
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDD != -1) {
        classGhe = classGheDangDat;
      }
      // nếu ghế chưa đặt
      if (ghe.daDat == false) {
        return (
          <button
            key={index}
            onClick={() => {
              dispatch(actionSetDatVe(ghe));
            }}>
            <div
              className={
                "ghe w-10 h-10 rounded-md border flex hover:shadow-xl justify-center items-center hover:cursor-pointer " +
                classGhe
              }>
              {ghe.stt}
            </div>
          </button>
        );
      }
      // nếu ghế đã đặt
      else
        return (
          <div
            key={index}
            className={
              "ghe w-10 h-10 border rounded-md flex justify-center items-center hover:cursor-not-allowed " +
              classGheDaDat
            }>
            X
          </div>
        );
    });
  };
  return (
    <div className='soDoRap col-span-8 w-3/4 rounded-sm p-5'>
      <p className='text-xl text-left underline text-rose-500'>
        Sơ đồ ghế ngồi:
      </p>
      <div className='flex items-center justify-center gap-10'>
        <div className='ghe w-16 h-16 border rounded-md flex justify-center items-center bg-green-300 text-center'>
          Ghế thường
        </div>
        <div className='ghe w-16 h-16 border rounded-md flex justify-center items-center bg-yellow-300 text-center'>
          Ghế Vip
        </div>
        <div className='ghe w-16 h-16 border rounded-md flex justify-center items-center bg-red-500 text-center'>
          Ghế đã đặt
        </div>
        <div className='ghe w-16 h-16 border rounded-md flex justify-center items-center bg-rose-300 text-center'>
          Ghế bạn chọn
        </div>
      </div>
      <div className='soDoRap w-full h-full '>
        <div className='manHinh rounded-lg flex justify-center h-20 items-center bg-slate-500 shadow-2xl m-5'>
          <p className='text-center text-xl text-white'> Màn Hình</p>
        </div>
        <div className='soDoGhe w-full h-full  grid grid-cols-16 gap-5'>
          {renderSeat()}
        </div>
      </div>
    </div>
  );
}
