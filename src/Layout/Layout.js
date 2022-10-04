import React from "react";
import Footer from "../Components/FooterTheme/Footer";
import Header from "../Components/HeaderTheme/Header";
// Func component Layout giúp tạo bộ khung cho các components
// các components cần được sắp xếp được xem như các props truyền vào cho func Comp Layout này
export default function Layout({ Component }) {
  return (
    <div className=''>
      <div className='fixed top-0 left-0 w-full z-10'>
        <Header />
      </div>
      <div className='pt-20 -z-10 w-full'>
        <Component />
      </div>
      <div className='pt-20 -z-10 w-full'>
        <Footer />
      </div>
    </div>
  );
}
