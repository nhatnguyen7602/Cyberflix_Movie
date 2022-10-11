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
          payload: res.data,
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
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        onFail(err.response?.data);
      });
  };
};

export const addMovieAction = (data, onSuccess, onFail) => {
  return () => {
    moviesServ
      .postAddMovie(data)
      .then(() => {
        onSuccess("Thêm phim thành công!");
      })
      .catch((err) => {
        onFail(err.response?.data);
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
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteMovieAction = (id, onSuccess, onFail) => {
  return () => {
    moviesServ
      .deleteMovie(id)
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        onFail(err.response?.data);
      });
  };
};
