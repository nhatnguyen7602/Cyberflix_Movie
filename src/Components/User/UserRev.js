import React from "react";
import { Card } from "antd";
const { Meta } = Card;
export default function UserRev({ userInfo }) {
  let userRev = userInfo.thongTinDatVe;
  let renderContent = () => {
    if (userRev.length == 0) {
      return <div className=''> Bạn chưa đặt bất kì vé nào </div>;
    } else {
      return userRev?.map((suatChieu, index) => {
        return (
          <div key={index}>
            <Card
              hoverable
              style={{
                borderColor: "red",
                overflow: "clip",
                width: "300px",
                height: "850px",
                borderRadius: "10px",
              }}
              cover={
                <img
                  className='w-full h-2/4 object-cover'
                  alt='example'
                  src={suatChieu.hinhAnh}
                />
              }>
              <Meta
                title={
                  <p className='text-red-500 truncate'>{userRev.tenPhim}</p>
                }
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
    }
  };
  return <div className='grid grid-cols-4 gap-5'>{renderContent()}</div>;
}
