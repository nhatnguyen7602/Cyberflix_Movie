import { message } from "antd";
import { moviesServ } from "../../Services/moviesServices";
import {
  SET_INFO_MOVIE,
  SET_LIST_MOVIE,
} from "../constants/adminMovieConstant";

export const getInfoMovieAction = (maPhim) => {
  return (dispatch) => {
    moviesServ
      .getDetailMovie(maPhim)
      .then((res) => {
        dispatch({
          type: SET_INFO_MOVIE,
          payload: res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateMovieAction = (data, onSuccess, onFail) => {
  return () => {
    moviesServ
      .updateMovie(data)
      .then((res) => {
        onSuccess();
      })
      .catch((err) => {
        onFail();
      });
  };
};

export const addMovieAction = (data, onSuccess, onFail) => {
  return () => {
    moviesServ
      .postAddMovie(data)
      .then((res) => {
        onSuccess();
      })
      .catch((err) => {
        onFail();
      });
  };
};

export const getListMovieAction = (name = "") => {
  return (dispatch) => {
    moviesServ
      .getListMovie(name)
      .then((res) => {
        dispatch({
          type: SET_LIST_MOVIE,
          payload: res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteMovieAction = (id) => {
  return (dispatch) => {
    moviesServ
      .deleteMovie(id)
      .then((res) => {
        message.success("Xoá phim thành công!");

        // Sau khi xoá load lại list phim
        dispatch(getListMovieAction());
      })
      .catch((err) => {
        message.error("Xoá phim thất bại!");
      });
  };
};
