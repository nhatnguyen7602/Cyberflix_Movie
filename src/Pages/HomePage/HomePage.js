import React from "react";
import { moviesServ } from "../../Services/moviesServices";
import { useEffect, useState } from "react";
import ItemMovie from "./ItemMovie";
import TabsMovie from "./TabsMovie";
import { useDispatch } from "react-redux";
import {
  setLoadingOnAction,
  setLoadingOffAction,
} from "../../Redux/actions/actionSpinner";
import Carousel from "../../Components/Carousel/Carousel";
import SearchNav from "../../Components/SearchNav/SearchNav";
import BackToTop from "../../Components/BackToTop/BackToTop";
export default function HomePage() {
  // Tạo useState movies
  const [movies, setMovies] = useState([]);
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
        setMovies(res.data.content);
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
  // Render card cho từng phim
  const renderMoviesCard = () => {
    return movies.slice(0, 10).map((data, index) => {
      return <ItemMovie key={index} data={data} />;
    });
  };
  return (
    <div className='container mx-auto font-link'>
      {/* // START - CAROUSEL */}
      <div id='carousel'>
        <Carousel />
      </div>
      {/* // END - CAROUSEL */}
      {/* // START - CAROUSEL */}
      <div>
        <SearchNav />
      </div>
      {/* // END - CAROUSEL */}
      {/* // START - LỊCH CHIẾU */}
      <p className='text-center text-xl font-link underline' id='dsphim'>
        {" "}
        DANH SÁCH PHIM
      </p>

      <div className='grid grid-cols-5 gap-4 font-link'>
        {renderMoviesCard()}
      </div>

      {/* // END - LỊCH CHIẾU */}

      {/* // START - THÔNG TIN CỤM RẠP */}
      <div className='my-10 font-link' id='cumRap'>
        <p className='text-center text-xl font-link underline'>
          {" "}
          THÔNG TIN CỤM RẠP & LỊCH CHIẾU
        </p>
        <TabsMovie />
      </div>
      {/* // END - THÔNG TIN CỤM RẠP */}
      {/* // START - BACK TO TOP */}
      <div className='backToTop fixed '>
        <BackToTop />
      </div>
      {/* // END - BACK TO TOP */}
    </div>
  );
}
