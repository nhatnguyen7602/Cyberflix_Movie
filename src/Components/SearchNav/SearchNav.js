import React from "react";
import { useEffect, useState } from "react";
import { Input, message, Space } from "antd";
import { moviesServ } from "../../Services/moviesServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLoadingOnAction,
  setLoadingOffAction,
} from "../../Redux/actions/actionSpinner";
const { Search } = Input;
export default function SearchNav() {
  // chuyển hướng trang bằng useNavigate từ react-router
  let navigate = useNavigate();
  // Tạo useState movies
  const [dataPhim, setDataPhim] = useState([]);
  // Tạo biến useDispatch gửi giá trị thay đổi(action) cho isLoading lên store
  const dispatch = useDispatch();
  // Gọi api
  useEffect(() => {
    // dispatch set isLoading = on
    dispatch(setLoadingOnAction());
    // setState isLoading
    // Gọi api danh sách phim từ moviesServ
    moviesServ
      .getListMovie()
      .then((res) => {
        // setState cho movieList bằng data gọi về từ api
        setDataPhim(res.data.content);
        // dispatch set isLoading = off
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        // setState isLoading
        console.log(err);
        // dispatch set isLoading = off
        dispatch(setLoadingOffAction());
      });
  }, []);
  const onSearch = (value) => {
    // tìm index dựa theo tên phim
    let index = dataPhim.findIndex((phim) => phim.tenPhim === value);
    if (index != -1) {
      message.success("Tìm thấy phim " + value);
      // lấy mã phim và chuyển hướng đến trang chi tiết
      let maPhimSearch = dataPhim[index].maPhim;
      console.log("maPhimSearch: ", maPhimSearch);
      setTimeout(() => {
        navigate(`/detail/${maPhimSearch}`);
      }, 500);
    } else {
      message.warning(" Không tìm thấy phim: " + value);
    }
  };
  return (
    <div className='searchBar my-5 w-full flex justify-center items-center'>
      <Space direction='vertical'>
        <Search
          placeholder='Nhập tên phìm cần tìm !'
          onSearch={onSearch}
          style={{ width: 500 }}
        />
      </Space>
    </div>
  );
}
