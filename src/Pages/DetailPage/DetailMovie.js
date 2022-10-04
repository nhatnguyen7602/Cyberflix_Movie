import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { moviesServ } from "../../Services/moviesServices";
import {
  setLoadingOnAction,
  setLoadingOffAction,
} from "../../Redux/actions/actionSpinner";
import MovieInfo from "../../Components/DetailMovie/MovieInfo";
import ScheduleInfo from "../../Components/DetailMovie/ScheduleInfo";
//
const DetailMovie = () => {
  //1. lấy id bằng cú pháp useParam()
  const maPhim = useParams();
  console.log("id page: ", maPhim);
  //2. setState = useState
  const [movieSche, setmovieSche] = useState([]);
  // Tạo biến useDispatch gửi giá trị thay đổi(action) cho isLoading lên store
  const dispatch = useDispatch();
  //3. truyền id vào useEffect gọi data movie qua api 1 lần duy nhất
  useEffect(() => {
    // dispatch set isLoading = on
    dispatch(setLoadingOnAction());
    // gọi data
    moviesServ
      .getScheduleMovie(maPhim.id)
      .then((res) => {
        console.log("lich chieu theo phim: ", res);
        // setState cho movieSche bằng data gọi về từ api
        setmovieSche(res.data.content);
        // dispatch set isLoading = off
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        // dispatch set isLoading = off
        dispatch(setLoadingOffAction());
      });
  }, []);
  //4. render card cho từng phim
  const renderMovieDetail = () => {
    return <MovieInfo data={movieSche} />;
  };
  //5. render lịch chiếu theo phim
  const renderMovieSche = () => {
    return <ScheduleInfo data={movieSche} />;
  };

  //
  return (
    <div className='container mx-auto'>
      <div>{renderMovieDetail()}</div>
      <div>{renderMovieSche()}</div>
    </div>
  );
};

export default DetailMovie;
