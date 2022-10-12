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
import { userServ } from "../../../Services/userServies";
import { useState } from "react";

const { Search } = Input;

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function UserAd() {
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();

        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      width: "15%",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      render: (text, user) => {
        return <span className="text-base font-medium">{user.hoTen}</span>;
      },
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();

        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
    },
    {
      title: "Điện thoại",
      dataIndex: "soDt",
      width: "15%",
    },

    {
      title: <SettingOutlined />,
      dataIndex: "taiKhoan",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="text-white mr-2 p-2 text-2xl"
              to={`/admin/user/edituser/${user.taiKhoan}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>

            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-white p-2 text-2xl"
              onClick={() => {
                const onSuccess = () => {
                  message.success("Xoá người dùng thành công!");
                  // dispatch(getListMovieAction());
                };

                const onFail = (mess) => {
                  message.error(mess);
                };

                if (
                  window.confirm(
                    `Bạn có chắc chắn muốn xoá người dùng ${user.hoTen}?`
                  )
                ) {
                  // dispatch(deleteMovieAction(film.maPhim, onSuccess, onFail));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </Fragment>
        );
      },
      width: "10%",
    },
  ];

  const onSearch = (value) => {
    // Gọi api lấy ds phim khi search
    // dispatch(getListMovieAction(value));
  };

  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    userServ
      .getUserList()
      .then((res) => {
        setListUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3 className="text-3xl">Quản lý người dùng</h3>

      <NavLink to="/admin/user/adduser">
        <Button size="large" type="primary" className="mb-4">
          Thêm người dùng
        </Button>
      </NavLink>

      <Search
        className="mb-5"
        placeholder="Nhập họ tên"
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />

      <Table
        columns={columns}
        dataSource={listUser}
        onChange={onChange}
        rowKey={"hoTen"}
      />
    </div>
  );
}
