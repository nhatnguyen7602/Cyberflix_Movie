import React from "react";
import { Descriptions } from "antd";
export default function MovieInfo({ data }) {
  const hotRender = () => {
    if (data.hot) {
      return "Hot lắm nha";
    } else {
      return "Cũng cùi thui";
    }
  };
  const trailerRender = () => {
    return (
      <iframe
        className='responsive-iframe'
        src={data.trailer}
        title='Trailer'></iframe>
    );
  };
  return (
    <div className='font-link pb-10 pt-3'>
      <Descriptions title='Chi tiết phim' layout='vertical' column={4}>
        <Descriptions.Item label='Tên Phim'>{data.tenPhim}</Descriptions.Item>
        <Descriptions.Item label='Ngày Khởi chiếu'>
          {data.ngayKhoiChieu}
        </Descriptions.Item>
        <Descriptions.Item label='Đánh giá'>{data.danhGia}</Descriptions.Item>
        <Descriptions.Item label='Độ hot'>{hotRender()}</Descriptions.Item>
        <Descriptions.Item label='Mô Tả' span={4}>
          {data.moTa}
        </Descriptions.Item>
      </Descriptions>
      <div className='container flex justify-center items-center'>
        {trailerRender()}
      </div>
    </div>
  );
}
