import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import "antd/dist/antd.css";
import DetailMovie from "./Pages/DetailPage/DetailMovie";
import Layout from "./Layout/Layout";
import Spinner from "./Components/Spinner/Spinner";
import ScrollToTop from "./Utils/ScrollToTop";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import CheckoutLayout from "./Layout/CheckoutLayout";
import Regis from "./Components/Regis/Regis";
import UserPage from "./Pages/UserPage/UserPage";
import UserLayout from "./Layout/UserLayout";
////////////////////////////////////////
import FilmAd from "./Pages/PagesAdmin/FilmAd/FilmAd";
import UserAd from "./Pages/PagesAdmin/UserAd/UserAd";
import LayoutComponent from "./Layout/LayoutAd";
import AddFilm from "./Pages/PagesAdmin/FilmAd/AddFilm/AddFilm";
import EditFilm from "./Pages/PagesAdmin/FilmAd/EditFilm/EditFilm";
import CreateScheduleFilm from "./Pages/PagesAdmin/FilmAd/CreateScheduleFilm/CreateScheduleFilm";
import AddUser from "./Pages/PagesAdmin/UserAd/AddUser/AddUser";
import EditUser from "./Pages/PagesAdmin/UserAd/EditUser/EditUser";

function App() {
  return (
    <div className="font-link">
      <Spinner />
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout Component={HomePage} />} />
            <Route
              path="/detail/:id"
              id={123}
              element={<Layout Component={DetailMovie} />}
            />
            <Route path="/login" element={<Layout Component={LoginPage} />} />
            <Route
              path="/checkout/:id"
              element={<CheckoutLayout Component={CheckoutPage} />}
            />
            <Route path="/regis" element={<Layout Component={Regis} />} />
            <Route
              path="/user/:taiKhoan"
              element={<UserLayout Component={UserPage} />}
            />

            <Route
              path="/admin"
              element={<LayoutComponent Component={FilmAd} />}
            />

            <Route
              path="/admin/user"
              element={<LayoutComponent Component={UserAd} />}
            />

            <Route
              path="/admin/addfilm"
              element={<LayoutComponent Component={AddFilm} />}
            />

            <Route
              path="/admin/editfilm/:id"
              element={<LayoutComponent Component={EditFilm} />}
            />

            <Route
              path="/admin/editfilm/createschedule/:id/:name"
              element={<LayoutComponent Component={CreateScheduleFilm} />}
            />

            <Route
              path="/admin/user/adduser"
              element={<LayoutComponent Component={AddUser} />}
            />

            <Route
              path="/admin/user/edituser/:tk"
              element={<LayoutComponent Component={EditUser} />}
            />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
