import { useSelector } from "react-redux";
import React from "react";
import { NavLink } from "react-router-dom";
import { localServ } from "../../Services/localServices";

export default function UserNav() {
  // lấy thông tin từ store về state bằng useSelector
  let user = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  // hàm xử lí thao tác đăng xuất
  let handleLogout = () => {
    // xóa dữ liệu từ localstorage
    localServ.user.remove();
    // remove data từ redux
    // dispatch({
    // type: SET_USER,
    // payload: null
    // })
    // chuyển trang đến trang login
    window.location.href = "/login";
  };
  // viết hàm render thông tin user
  let renderUser = () => {
    // nếu biến user lấy từ localstorage có giá trị (true)
    // hiển thị thông tin user và nút đăng xuất
    if (user) {
      return (
        <>
          <NavLink to={`/user/${user.taiKhoan}`}>
            {" "}
            <span className='mx-4 underline text-black'> {user.taiKhoan}</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className='border rounded px-5 py-1.5 text-red-500 hover:bg-white transition duration-300'>
            {" "}
            Đăng xuất
          </button>
        </>
      );
    } else {
      // nếu biến user lấy từ localstorage ko có giá trị (false)
      // hiển thị nút đăng nhập và đăng kí
      return (
        <>
          <div className='space-x-5 mx-5'>
            <NavLink to='/login'>
              <button className='border rounded transition bg-red-500 hover:border-red-800 hover:bg-white border-white shadow-lg text-black px-5 py-2 hover:text-red-500'>
                {" "}
                Đăng nhập
              </button>
            </NavLink>
            <NavLink to='/regis'>
              <button className='border rounded transition hover:bg-red-500  border-red-500 px-5 py-2 text-black hover:text-white'>
                {" "}
                Đăng kí
              </button>
            </NavLink>
          </div>
        </>
      );
    }
  };
  //
  return <div>{renderUser()}</div>;
}
