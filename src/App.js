import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import "antd/dist/antd.min.css";
import DetailMovie from "./Pages/DetailPage/DetailMovie";
import Layout from "./Layout/Layout";
import Spinner from "./Components/Spinner/Spinner";
import ScrollToTop from "./Utils/ScrollToTop";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import CheckoutLayout from "./Layout/CheckoutLayout";

function App() {
  return (
    <div className='font-link'>
      <Spinner />
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path='/' element={<Layout Component={HomePage} />} />
            <Route
              path='/detail/:id'
              id={123}
              element={<Layout Component={DetailMovie} />}
            />
            <Route path='/login' element={<Layout Component={LoginPage} />} />
            <Route
              path='/checkout/:id'
              element={<CheckoutLayout Component={CheckoutPage} />}
            />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
