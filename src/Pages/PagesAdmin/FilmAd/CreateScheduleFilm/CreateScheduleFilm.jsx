import React from "react";
import { Form, DatePicker, InputNumber, Select, message } from "antd";
import { useEffect } from "react";
import { moviesServ } from "../../../../Services/moviesServices";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../../Redux/actions/actionSpinner";

export default function CreateScheduleFilm() {
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  const { id, name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },

    onSubmit: (values) => {
      console.log("values: ", values);
      dispatch(setLoadingOnAction());

      moviesServ
        .createScheduleFilm(values)
        .then(() => {
          dispatch(setLoadingOffAction());

          message.success("Thêm lịch chiếu thành công!");

          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        })
        .catch((err) => {
          dispatch(setLoadingOffAction());

          message.error(err.response?.data);
        });
    },
  });

  useEffect(() => {
    dispatch(setLoadingOnAction());

    moviesServ
      .getInfoTheaterSystems()
      .then((res) => {
        dispatch(setLoadingOffAction());

        setState({ ...state, heThongRapChieu: res.data.content });
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());

        console.log(err);
      });
  }, []);

  const handleChangeTheaterSystem = (value) => {
    // Gọi api lấy thông tin rạp
    moviesServ
      .getInfoTheater(value)
      .then((res) => {
        setState({ ...state, cumRapChieu: res.data.content });
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  };

  const handleChangeTheaters = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onOk = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeDate = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  const showTheaterSystems = () => {
    return state.heThongRapChieu?.map((systems) => ({
      label: systems.tenHeThongRap,
      value: systems.maHeThongRap,
    }));
  };

  const showTheaters = () => {
    return state.cumRapChieu?.map((theaters) => ({
      label: theaters.tenCumRap,
      value: theaters.maCumRap,
    }));
  };

  return (
    <div className="container">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onSubmitCapture={formik.handleSubmit}
      >
        <h3 className="text-3xl mb-10">Tạo lịch chiếu - {name}</h3>
        <Form.Item label="Hệ thống rạp">
          <Select
            options={showTheaterSystems()}
            onChange={handleChangeTheaterSystem}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Select
            options={showTheaters()}
            onChange={handleChangeTheaters}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>

        <Form.Item label="Ngày - Giờ chiếu">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item label="Giá vé">
          <InputNumber
            min={75000}
            max={150000}
            onChange={onChangeInputNumber}
          />
        </Form.Item>

        <Form.Item label="Chức năng">
          <button className="bg-green-700 text-white p-2 rounded" type="submit">
            Tạo lịch chiếu
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
