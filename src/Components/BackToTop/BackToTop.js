import React from "react";
import bg_animate10 from "../../Assets/bg_animate10.json";
import Lottie from "lottie-react";
import { Link } from "react-scroll";
export default function BackToTop() {
  return (
    <Link to='carousel' smooth='true' offset={-150}>
      <div className='w-56 h-full duration-100 ease-out hover:ease-in transition cursor-pointer hover:animate-bounce flex flex-col justify-center items-center'>
        <Lottie animationData={bg_animate10}></Lottie>
      </div>
    </Link>
  );
}
