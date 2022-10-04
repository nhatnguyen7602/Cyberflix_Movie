import React from "react";
import Lottie from "lottie-react";
import rocketSpinner from "../../Assets/rocketSpinner.json";
import { useSelector } from "react-redux";
export default function Spinner() {
  // Tạo useSelector để kiểm tra isLoading từ redux cho comp Spinner
  let { isLoading } = useSelector((state) => state.spinnerReducer);
  // Kiểm tra isLoading render nếu == true
  return isLoading ? (
    <div className='h-screen w-screen fixed left-0 top-0 bg-rose-300 flex justify-center bg-opacity-70 items-center z-50'>
      <Lottie height={400} width={400} animationData={rocketSpinner}></Lottie>{" "}
    </div>
  ) : (
    <></>
  );
}
