import React from "react";
import { Form, DatePicker, InputNumber, Select, message } from "antd";
import { Button } from "antd/lib/radio";
import { useEffect } from "react";
import { moviesServ } from "../../../../Services/moviesServices";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export default function CreateScheduleFilm() {
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
    dsRap: [],
  });
  const { id, name } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },

    onSubmit: (values) => {
      moviesServ
        .createScheduleFilm(values)
        .then(() => {
          message.success("Thêm lịch chiếu thành công!");

          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        })
        .catch((err) => {
          message.error(err.response?.data);
        });
    },
  });

  useEffect(() => {
    moviesServ
      .getInfoTheaterSystems()
      .then((res) => {
        setState({ ...state, heThongRapChieu: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeTheaterSystem = (value) => {
    // Gọi api lấy thông tin rạp
    moviesServ
      .getInfoTheater(value)
      .then((res) => {
        setState({ ...state, cumRapChieu: res.data });
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  };

  const handleChangeTheaters = (value) => {
    const indexCumRap = state.cumRapChieu
      .map((rap) => rap.maCumRap)
      .indexOf(value);
    setState({ ...state, dsRap: state.cumRapChieu[indexCumRap].danhSachRap });
  };

  const handleChangeTheater = (value) => {
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

  const showTheater = () => {
    return state.dsRap?.map((theater) => ({
      label: theater.tenRap,
      value: theater.maRap,
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

        <Form.Item label="Rạp">
          <Select
            options={showTheater()}
            onChange={handleChangeTheater}
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
