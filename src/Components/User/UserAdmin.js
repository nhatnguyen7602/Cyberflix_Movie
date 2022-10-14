import React from "react";
import { useEffect } from "react";
import { userServ } from "../../Services/userServies";
import { useState } from "react";
import UserTable from "./UserTable";
import MovieAction from "./UserAction";

export default function UserAdmin() {
  const [usersList, setUsersList] = useState([]);
  // Gọi api lấy data usersList từ userServ
  useEffect(() => {
    // tạo func gọi api lấy userList
    let fetchUserList = () => {
      userServ
        .getUserList()
        .then((res) => {
          // bổ sung trường action gồm xóa sửa cho data userList để lấy dữ liệu render về sau
          // clone data
          let dataRemake = res.data.content.map((item) => {
            // bổ sung trường action truyền vào giá trị taiKhoan
            return {
              ...item,
              action: (
                <MovieAction
                  //callback lại fetchUserList khi UserAction render lại thành công (onSuccess)
                  onSuccess={fetchUserList}
                  // onSuccess={fetchUserList()}
                  taiKhoan={item.taiKhoan}
                />
              ),
            };
          });
          // lấy data userList lưu về state
          setUsersList(dataRemake);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // gọi fuc lấy userList
    fetchUserList();
  }, []);
  return (
    <div className='container mx-auto'>
      <UserTable usersList={usersList} />
    </div>
  );
}
