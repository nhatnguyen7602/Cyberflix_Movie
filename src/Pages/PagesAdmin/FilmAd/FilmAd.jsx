import React, { useEffect } from "react";
import { Button, message, Table } from "antd";
import { Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieAction,
  getListMovieAction,
} from "../../../Redux/actions/actionAdmin";

const { Search } = Input;

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function FilmAd() {
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      width: "10%",

      sorter: (a, b) => {
        let maPhimA = a.maPhim;
        let maPhimB = b.maPhim;

        return maPhimA - maPhimB;
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://piscum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "10%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      render: (text, film) => {
        return <span className="text-base font-medium">{film.tenPhim}</span>;
      },
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();

        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      width: "25%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      sorter: (a, b) => {
        let moTaA = a.moTa.toLowerCase().trim();
        let moTaB = b.moTa.toLowerCase().trim();

        if (moTaA > moTaB) {
          return 1;
        }
        return -1;
      },
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 150
              ? film.moTa.substr(0, 150) + "..."
              : film.moTa}
          </Fragment>
        );
      },
      width: "40%",
    },

    {
      title: <SettingOutlined />,
      dataIndex: "maPhim",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="text-white mr-2 p-2 text-2xl"
              to={`/admin/editfilm/${film.maPhim}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>

            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-white p-2 text-2xl"
              onClick={() => {
                const onSuccess = () => {
                  message.success("Xoá phim thành công!");
                  dispatch(getListMovieAction());
                };

                const onFail = (mess) => {
                  message.error(mess);
                };

                if (
                  window.confirm(
                    `Bạn có chắc chắn muốn xoá phim ${film.tenPhim}?`
                  )
                ) {
                  dispatch(deleteMovieAction(film.maPhim, onSuccess, onFail));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>

            <NavLink
              key={3}
              className="text-white mr-2 p-2 text-2xl"
              to={`/admin/editfilm/createschedule/${film.maPhim}/${film.tenPhim}`}
            >
              <CalendarOutlined style={{ color: "green" }} />
            </NavLink>
          </Fragment>
        );
      },
      width: "15%",
    },
  ];

  const onSearch = (value) => {
    // Gọi api lấy ds phim khi search
    dispatch(getListMovieAction(value));
  };

  const { listMovie } = useSelector((state) => state.movieReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListMovieAction());
  }, []);

  return (
    <div>
      <h3 className="text-3xl">Quản lý phim</h3>

      <NavLink to="/admin/addfilm">
        <Button size="large" type="primary" className="mb-4">
          Thêm phim
        </Button>
      </NavLink>

      <Search
        className="mb-5"
        placeholder="Nhập tên phim"
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />

      <Table
        columns={columns}
        dataSource={listMovie}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
}
