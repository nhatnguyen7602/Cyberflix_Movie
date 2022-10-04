import React from "react";
import { useState } from "react";
export default function SoDoRap({ data }) {
  const [normalSeatSelect, setNormalSeatSelect] = useState("bg-green-300");
  // hàm đổi màu ghế
  let handleSeatSelect = () => {
  };

  // hàm render sơ đồ ghế
  let renderSeat = () => {
    console.log("data - renderSeat(): ", data);
    return data.danhSachGhe?.map((ghe, index) => {
      // nếu ghế chưa đặt
      if (ghe.daDat == false) {
        if (ghe.loaiGhe == "Thuong") {
          return (
            <button
              onClick={() => {
                handleSeatSelect();
              }}>
              <div
                key={index}
                className={
                  "ghe w-10 h-10 rounded-md border flex justify-center items-center hover:shadow-xl hover:cursor-pointer " +
                  `${normalSeatSelect} ` +
                  `${ghe.stt}`
                }>
                {ghe.stt}
              </div>
            </button>
          );
        } else {
          return (
            <button onClick={() => {}}>
              <div
                key={index}
                className='ghe w-10 h-10 rounded-md border flex hover:shadow-xl justify-center items-center bg-yellow-300 hover:cursor-pointer'>
                {ghe.stt}
              </div>
            </button>
          );
        }
      }
      // nếu ghế đã đặt
      else
        return (
          <div
            key={index}
            className='ghe w-10 h-10 border rounded-md flex justify-center items-center bg-red-500 hover:cursor-not-allowed'>
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
