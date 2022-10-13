import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { moviesServ } from "../../Services/moviesServices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setLoadingOnAction,
  setLoadingOffAction,
} from "../../Redux/actions/actionSpinner";
export default function Carousel() {
  // Tạo useState carousel
  const [carousel, setCarousel] = useState([]);
  // hàm render phim đang chiếu
  const dispatch = useDispatch();
  // Gọi api
  useEffect(() => {
    // dispatch set isLoading = on
    dispatch(setLoadingOnAction());
    // setState isLoading
    // Gọi api danh sách phim từ moviesServ
    moviesServ
      .getListMovieCarousel()
      .then((res) => {
        // setState cho movieList bằng data gọi về từ api
        setCarousel(res.data.content);
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
  // Render Carousel cho từng phim
  const renderMoviesCarousel = () => {
    return carousel.slice(0, 10).map((data, index) => {
      return (
        <div className='' key={index}>
          <img className='object-cover object-center' src={data.hinhAnh}></img>
        </div>
      );
    });
  };
  // setting cho slider
  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className='mt-5 w-4/5 mx-auto'>
      <h4 className='text-center text-xl underline'>
        PHIM MỚI NHẤT & CÁC BOM TẤN - CHỈ CÓ TẠI CYBERFLIX
      </h4>
      <div className=''>
        <Slider {...settings}>{renderMoviesCarousel()}</Slider>
      </div>
    </div>
  );
}
