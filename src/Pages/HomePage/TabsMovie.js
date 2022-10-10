import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import ItemTabsMovie from "./ItemTabsMovie";
import { moviesServ } from "../../Services/moviesServices";
export default function TabsMovies() {
  const [dataMovies, setDataMovies] = useState([]);
  //gọi api lấy dữ liệu hệ thống rạp và phim đang chiếu dựa trên các rạp đó
  useEffect(() => {
    moviesServ
      .getMovieByTheater()
      .then((res) => {
        setDataMovies(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let renderContent = () => {
    return dataMovies?.map((heThongRap, index) => {
      return (
        <Tabs.TabPane
          tab={<img className='w-16 h-16' src={heThongRap.logo} />}
          key={index}>
          <Tabs style={{ height: 500 }} tabPosition='left'>
            {heThongRap.lstCumRap.map((cumRap, index) => {
              return (
                <Tabs.TabPane
                  tab={
                    <div className='w-48 text-left '>
                      <p className='text-gray-700 truncate'>
                        {cumRap.tenCumRap}
                      </p>
                      <p className='truncate'>{cumRap.diaChi}</p>
                    </div>
                  }
                  key={index}>
                  <div
                    className='border scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-red-200 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full'
                    style={{ height: 500, overflowY: "scroll" }}>
                    {cumRap.danhSachPhim.map((phim, index) => {
                      return <ItemTabsMovie data={phim} key={index} />;
                    })}
                  </div>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Tabs.TabPane>
      );
    });
  };

  return (
    <div>
      <Tabs style={{ height: 500 }} tabPosition='left' defaultActiveKey='1'>
        {renderContent()}
      </Tabs>
    </div>
  );
}
