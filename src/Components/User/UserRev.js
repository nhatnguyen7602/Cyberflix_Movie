import React from "react";
import { Card } from "antd";
const { Meta } = Card;
export default function UserRev({ userInfo }) {
  let userRev = userInfo.thongTinDatVe;
  console.log("userRev: ", userRev);
  let renderContent = () => {
    return userRev?.map((suatChieu, index) => {
      return (
        <div key={index}>
          <Card
            hoverable
            style={{
              overflow: "clip",
              width: "200px",
              height: "750px",
            }}
            cover={
              <img
                className='w-full h-2/4 object-cover'
                alt='example'
                src={suatChieu.hinhAnh}
              />
            }>
            <Meta
              title={<p className='text-red-500 truncate'>{userRev.tenPhim}</p>}
            />
            {/* tạo đường dẫn cho button bằng thẻ NavLink */}
            <p className='underline'>Mã đặt vé: {suatChieu.maVe}</p>
            <p>Ngày đặt: {suatChieu.ngayDat}</p>
            <p>Tên phim: {suatChieu.tenPhim}</p>
            <hr />
            <p>Hệ thống rạp: {suatChieu.danhSachGhe[index]?.tenHeThongRap}</p>
            <p>Rạp: {suatChieu.danhSachGhe[index]?.tenCumRap}</p>
            <p>Thời lượng phim: {suatChieu.thoiLuongPhim}</p>
            <p>
              Số ghế
              {suatChieu.danhSachGhe?.map((ghe, index) => {
                return (
                  <span className='inline' key={index}>
                    {" "}
                    - {ghe.tenGhe}{" "}
                  </span>
                );
              })}
            </p>
          </Card>
        </div>
      );
    });
  };
  return <div className='grid grid-cols-5 gap-5'>{renderContent()}</div>;
}
