import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { moviesServ } from "../../Services/moviesServices";
import {
  setLoadingOnAction,
  setLoadingOffAction,
} from "../../Redux/actions/actionSpinner";
import SoDoRap from "../../Components/Checkout/SoDoRap";
import BillCheck from "../../Components/Checkout/BillCheck";

export default function CheckoutPage() {
  //1. lấy id bằng cú pháp useParam()
  const maLichChieu = useParams();
  console.log("id lịch chiếu: ", maLichChieu.id);
  //2 lấy danh sách ghế đang đặt từ reducer store bằng useSelector
  const { danhSachGheDangDat } = useSelector((state) => state.checkoutReducer);
  console.log("danhSachGheDangDat: ", danhSachGheDangDat);
  //3. tạo state cho thông tin show chiếu setState = useState

  const [showDetail, setShowDetail] = useState([]);
  // Tạo biến useDispatch gửi giá trị thay đổi(action) cho isLoading lên store
  const dispatch = useDispatch();
  //4. lấy thông tin show chiếu
  // truyền id vào useEffect gọi data show qua api 1 lần duy nhất:
  useEffect(() => {
    // dispatch set isLoading = on
    dispatch(setLoadingOnAction());
    // gọi data
    moviesServ
      .getShow(maLichChieu.id)
      .then((res) => {
        console.log("data show - useEffect: ", res);
        // setstate cho show
        setShowDetail(res.data.content);
        console.log("useEffect complete: setShow");
        // dispatch set isLoading = off
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        // dispatch set isLoading = off
        dispatch(setLoadingOffAction());
      });
  }, []);
  //5.1 hàm render SoDoRap
  const renderSoDoRap = () => {
    return <SoDoRap data={showDetail} />;
  };
  //5.2 hàm render BillCheck
  const renderBillCheck = () => {
    return <BillCheck data={showDetail} />;
  };
  //6.
  return (
    <div className='container m-auto'>
      <div className='flex flex-row justify-between items-center'>
        {renderSoDoRap()}
        {renderBillCheck()}
      </div>
    </div>
  );
}
