import React from "react";
import { Card } from "antd";
import { NavLink } from "react-router-dom";
const { Meta } = Card;

// Lấy dữ liệu { data } vào functionComponent
export default function ItemMovie({ data }) {
  let desc = `Ngày khởi chiếu: ${data.ngayKhoiChieu}`;
  return (
    <div>
      {" "}
      <Card
        hoverable
        style={{
          width: "100%",
          borderColor: "red",
          borderRadius: "10px",
        }}
        cover={
          <img
            style={{
              height: "300px",
              width: '100%'
            }}
            className='h-96 w-full object-cover'
            alt='example'
            src={data.hinhAnh}
          />
        }>
        <Meta
          title={<p className='text-red-500 truncate'>{data.tenPhim}</p>}
          description={desc}
        />
        {/* tạo đường dẫn cho button bằng thẻ NavLink */}
        <NavLink to={`/detail/${data.maPhim}`}>
          <button className='w-full rounded-md my-1 py-2 text-center bg-red-300 text-black hover:text-white hover:bg-red-600 transition-all duration-500'>
            Xem chi tiết
          </button>
        </NavLink>
      </Card>
    </div>
  );
}

//
