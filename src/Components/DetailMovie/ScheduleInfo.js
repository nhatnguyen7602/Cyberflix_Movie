import React from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
export default function ScheduleInfo({ data }) {
  console.log("data schedule: ", data);
  let renderSchedule = () => {
    return data.heThongRapChieu?.map((htr, index) => {
      return (
        <Tabs.TabPane
          tab={<img className='w-16 h-16' src={htr.logo} />}
          key={index}>
          {/* content của tab ở đây */}
          {htr.cumRapChieu?.map((cumRap, index) => {
            return (
              <div key={index}>
                <div className='thongTinRap flex justify-start items-start'>
                  <p className='text-xl font-bold'>{cumRap.tenCumRap}</p>
                </div>
                <div className='thongTinLichChieu pt-3 grid grid-cols-3 gap-5'>
                  {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                    return (
                      <NavLink to={`/checkout/${lichChieu.maLichChieu}`}>
                        <div
                          key={index}
                          className='rounded h-10 flex items-center justify-center bg-red-300 text-black hover:text-white hover:bg-red-500 transtion duration-300 cursor-pointer hover:shadow'>
                          <div>{lichChieu.ngayChieuGioChieu}</div>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
      );
    });
  };
  return (
    <div className='font-link'>
      <p className='text-center text-xl font-link underline'>
        {" "}
        Đặt vé {data.tenPhim}{" "}
      </p>
      <Tabs style={{ height: 310 }} tabPosition='left' defaultActiveKey='1'>
        {renderSchedule()}
      </Tabs>
    </div>
  );
}
