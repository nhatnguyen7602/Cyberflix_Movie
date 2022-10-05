import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { moviesServ } from "../../../Services/moviesServices";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const { Search } = Input;

const onSearch = (value) => console.log(value);

const columns = [
  {
    title: "Mã phim",
    dataIndex: "maPhim",
    width: "10%",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
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
    width: "15%",
  },
  {
    title: "Tên phim",
    dataIndex: "tenPhim",
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
          {film.moTa.length > 50 ? film.moTa.substr(0, 50) + "..." : film.moTa}
        </Fragment>
      );
    },
    width: "25%",
  },

  {
    title: "Hành động",
    dataIndex: "hanhDong",
    render: (text, film) => {
      return (
        <Fragment>
          <NavLink className="text-white mr-2 p-2 text-2xl" to="/">
            <EditOutlined style={{ color: "blue" }} />
          </NavLink>

          <NavLink className="text-white p-2 text-2xl" to="/">
            <DeleteOutlined style={{ color: "red" }} />
          </NavLink>
        </Fragment>
      );
    },
    width: "25%",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function FilmAd() {
  const [data, setData] = useState([]);

  useEffect(() => {
    moviesServ
      .getListMovie()
      .then((res) => {
        console.log(res);
        setData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3 className="text-3xl">Quản lý phim</h3>

      <NavLink to="/admin/addfilm">
        <Button className="">Thêm phim</Button>
      </NavLink>

      <Search
        className="mb-5"
        placeholder="input search text"
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />

      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}
