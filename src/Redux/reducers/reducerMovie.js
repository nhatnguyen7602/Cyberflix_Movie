import {} from "../../Services/localServices";
import { SET_MOVIE } from "../constants/constantUser";
import {
  SET_INFO_MOVIE,
  SET_LIST_MOVIE,
} from "../constants/adminMovieConstant";

const initialState = {
  // lấy thông tin user ở localStorage từ localServ
  danhSachGheDangDat: [],

  infoMovie: {},

  listMovie: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIE: {
      state.movieInfor = action.payload;
      return { ...state };
    }

    case SET_INFO_MOVIE: {
      state.infoMovie = action.payload;

      return { ...state };
    }

    case SET_LIST_MOVIE: {
      state.listMovie = action.payload;

      return { ...state };
    }

    default:
      return state;
  }
};
