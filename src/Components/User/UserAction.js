import { message } from "antd";
import React from "react";
import { userServ } from "../../Services/userServies";
import { useState } from "react";
import EditUser from "./EditUser";

export default function UserAction({ taiKhoan, onSuccess }) {
  const [userEdit, setUserEdit] = useState([]);
  // hàm xóa user
  let handleDeleteUser = () => {
    userServ
      .deleteUser(taiKhoan)
      .then((res) => {
        console.log(res);
        message.success("Xóa User thành công!");
        // gọi lại callback onSuccess
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        message.error("User đã đặt vé, Không thể xóa User!");
      });
  };
  let handleEditUser = () => {
    userServ
      .postUserInfo(taiKhoan)
      .then((res) => {
        console.log("data user edit: ", res);
        setUserEdit(res.data.content);
        // hiển thị thông tin user lên input
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=' flex'>
      <button
        className='bg-red-500 hover:bg-red-700 bg-transparent hover:text-white px-4 border border-red-500 hover:border-transparent h-8 rounded-sm mx-1'
        onClick={handleDeleteUser}>
        Xóa
      </button>
      <div className='' onClick={handleEditUser}>
        <EditUser data={userEdit} />
      </div>
    </div>
  );
}
