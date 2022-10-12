import { message } from "antd";
import { moviesServ } from "../../Services/moviesServices";
import { userServ } from "../../Services/userServies";
import {
  SET_INFO_MOVIE,
  SET_LIST_MOVIE,
} from "../constants/adminMovieConstant";
import { SET_USER_EDIT } from "../constants/constantUser";
import { setLoadingOffAction, setLoadingOnAction } from "./actionSpinner";

export const getInfoMovieAction = (maPhim) => {
  return (dispatch) => {
    dispatch(setLoadingOnAction());

    moviesServ
      .getDetailMovie(maPhim)
      .then((res) => {
        dispatch({
          type: SET_INFO_MOVIE,
          payload: res.data,
        });

        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());

        console.log(err);
      });
  };
};

export const updateMovieAction = (data, onSuccess, onFail) => {
  return (dispatch) => {
    dispatch(setLoadingOnAction());

    moviesServ
      .updateMovie(data)
      .then(() => {
        dispatch(setLoadingOffAction());

        onSuccess();
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());

        onFail(err.response?.data);
      });
  };
};

export const addMovieAction = (data, onSuccess, onFail) => {
  return (dispatch) => {
    dispatch(setLoadingOnAction());

    moviesServ
      .postAddMovie(data)
      .then(() => {
        dispatch(setLoadingOffAction());

        onSuccess();
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());

        onFail(err.response?.data);
      });
  };
};

export const getListMovieAction = (name = "") => {
  return (dispatch) => {
    dispatch(setLoadingOnAction());

    moviesServ
      .getListMovie(name)
      .then((res) => {
        dispatch(setLoadingOffAction());

        dispatch({
          type: SET_LIST_MOVIE,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());

        console.log(err);
      });
  };
};

export const deleteMovieAction = (id, onSuccess, onFail) => {
  return (dispatch) => {
    dispatch(setLoadingOnAction());

    moviesServ
      .deleteMovie(id)
      .then(() => {
        dispatch(setLoadingOffAction());

        onSuccess();
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());

        onFail(err.response?.data);
      });
  };
};

export const getInfoUserAction = (dataId) => {
  return (dispatch) => {
    dispatch(setLoadingOnAction());

    userServ
      .getUserInfo(dataId)
      .then((res) => {
        dispatch(setLoadingOffAction());

        dispatch({
          type: SET_USER_EDIT,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());

        console.log(err);
      });
  };
};
