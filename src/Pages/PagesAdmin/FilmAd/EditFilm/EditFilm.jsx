import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getInfoMovieAction,
  updateMovieAction,
} from "../../../../Redux/actions/actionAdmin";

const EditFilm = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const { infoMovie } = useSelector((state) => state.movieReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    dispatch(getInfoMovieAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: infoMovie.maPhim,
      tenPhim: infoMovie.tenPhim,
      trailer: infoMovie.trailer,
      moTa: infoMovie.moTa,
      ngayKhoiChieu: infoMovie.ngayKhoiChieu,
      dangChieu: infoMovie.dangChieu,
      sapChieu: infoMovie.sapChieu,
      hot: infoMovie.hot,
      danhGia: infoMovie.danhGia,
      hinhAnh: null,
    },

    onSubmit: (values) => {
      values.maNhom = "GP03";

      // Tạo đối tượng formData => Đưa values từ formik vào formData
      let formData = new FormData();

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      const onSuccess = () => {
        message.success("Cập nhật thành công!");
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      };

      const onFail = () => {
        message.error("Cập nhật thất bại!");
      };

      // ditspatch action cập nhật phim
      dispatch(updateMovieAction(formData, onSuccess, onFail));
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);

    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeValue = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    // Lấy file ra từ e
    let file = e.target.files[0];

    // Kiểm tra là hình ảnh
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      // Đem dữ liệu lưu vào formik. await: đợi chạy xong mới chạy những hàm tiếp theo
      await formik.setFieldValue("hinhAnh", file);

      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
    >
      <h3 className="text-3xl">Cập Nhật phim</h3>

      <Form.Item label="Tên phim">
        <Input
          name="tenPhim"
          value={formik.values.tenPhim}
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item label="Trailer">
        <Input
          name="trailer"
          value={formik.values.trailer}
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item label="Mô tả">
        <Input
          name="moTa"
          value={formik.values.moTa}
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          onChange={handleChangeDatePicker}
          format={"DD/MM/YYYY"}
          defaultValue={moment(formik.values.ngayKhoiChieu)}
        />
      </Form.Item>

      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeValue("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>

      <Form.Item label="Hot" valuePropName="checked">
        <Switch
          onChange={handleChangeValue("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>

      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeValue("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>

      <Form.Item label="Số sao">
        <InputNumber
          onChange={handleChangeValue("danhGia")}
          min={1}
          max={10}
          value={formik.values.danhGia}
        />
      </Form.Item>

      <Form.Item label="Hình ảnh">
        <Input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/jpg"
        />

        <img
          className="mt-2"
          style={{ width: 80, height: 80, objectFit: "contain" }}
          src={imgSrc === null ? infoMovie.hinhAnh : imgSrc}
          alt="..."
        />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <button type="submit" className="bg-green-700 text-white p-2 rounded">
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};

export default EditFilm;
