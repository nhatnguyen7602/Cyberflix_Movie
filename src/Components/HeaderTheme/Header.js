import React from "react";
import { Link } from "react-scroll";
import UserNav from "./UserNav";
import { VscRocket } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <div className='shadow-xl font-link' >
      <div className='h-20 flex  justify-between mx-auto items-center bg-red-300 px-4'>
        <NavLink to='/'>
          <span className=' flex text-3xl animate-pulse text-black items-center justify-center font-bold'>
            {" "}
            <VscRocket /> CYBERFLIX
          </span>
        </NavLink>
        <div className='flex gap-5'>
          <Link to='dsphim' offset={-190} smooth={true}>
            <span className='text-base underline text-red-500 hover:text-black transition duration-300'>
              DANH SÁCH PHIM
            </span>
          </Link>

          <Link to='cumRap' offset={-100} smooth={true}>
            <span className='text-base underline text-red-500 hover:text-black transition duration-300'>
              CỤM RẠP & LỊCH CHIẾU
            </span>
          </Link>

          {/* <Link to='/detail'>
            <span className='text-base underline text-red-500 hover:text-black transition duration-300'>
              THÔNG TIN
            </span>
          </Link> */}
        </div>
        <UserNav />
      </div>
    </div>
  );
}
