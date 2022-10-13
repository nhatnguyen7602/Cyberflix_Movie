import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieAction from "./MovieAction";
import MovieTable from "./MovieTable";
import { moviesServ } from "../../Services/moviesServices";
import AddMovie from "./AddMovie";
export default function MovieAdmin() {
  //setState bằng useState
  const [moviesList, setMoviesList] = useState([]);
  // Gọi api lấy data usersList từ userServ
  useEffect(() => {
    // tạo func gọi api lấy userList
    let fetchMovieList = () => {
      moviesServ
        .getListMovie()
        .then((res) => {
          // bổ sung trường action gồm xóa sửa cho data MovieList để lấy dữ liệu render về sau
          // clone data
          let dataRemake = res.data.content.map((item) => {
            // bổ sung trường action truyền vào giá trị taiKhoan
            return {
              ...item,
              action: (
                <MovieAction
                  //callback lại fetchMovieList khi UserAction render lại thành công (onSuccess)
                  onSuccess={fetchMovieList}
                  // onSuccess={fetchMovieList()}
                  maPhim={item.maPhim}
                />
              ),
            };
          });
          // lấy data MovieList lưu về state
          setMoviesList(dataRemake);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // gọi fuc lấy MovieList
    fetchMovieList();
  }, []);
  return (
    <div className='container mx-auto'>
      <AddMovie />
      <MovieTable moviesList={moviesList} />
    </div>
  );
}
