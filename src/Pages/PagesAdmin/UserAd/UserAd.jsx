import React, { useEffect } from "react";
import { Button, message, Table } from "antd";
import { Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { userServ } from "../../../Services/userServies";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setLoadingOnAction,
  setLoadingOffAction,
} from "../../../Redux/actions/actionSpinner";

const { Search } = Input;

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function UserAd() {
  const [listUser, setListUser] = useState([]);
  const dispatch = useDispatch();

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
      dataIndex: "soDT",
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

                  userServ
                    .getUserList()
                    .then((res) => {
                      setListUser(res.data.content);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                };

                const onFail = (mess) => {
                  message.error(mess);
                };

                if (
                  window.confirm(
                    `Bạn có chắc chắn muốn xoá người dùng ${user.hoTen}?`
                  )
                ) {
                  dispatch(setLoadingOnAction());

                  userServ
                    .deleteUser(user.taiKhoan)
                    .then(() => {
                      dispatch(setLoadingOffAction());

                      onSuccess();
                    })
                    .catch((err) => {
                      dispatch(setLoadingOffAction());

                      onFail(err.response?.data);
                    });
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
    dispatch(setLoadingOnAction());

    userServ
      .searchUser(value)
      .then((res) => {
        dispatch(setLoadingOffAction());

        setListUser(res.data.content);
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());

        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(setLoadingOnAction());

    userServ
      .getUserList()
      .then((res) => {
        dispatch(setLoadingOffAction());

        setListUser(res.data.content);
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());

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
