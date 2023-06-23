import { DatePicker, Form, Input, InputNumber, message, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMovieAction } from "../../../../Redux/actions/actionAdmin";

const { TextArea } = Input;

const AddFilm = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },

    onSubmit: (values) => {
      values.maNhom = "GP03";

      // Tạo đối tượng formData => Đưa values từ formik vào formData
      let formData = new FormData();

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(`${key}`, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

      console.log(formData.get("File"));

      const onSuccess = () => {
        message.success("Thêm phim thành công!");
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      };

      const onFail = (mess) => {
        message.error(mess);
      };

      dispatch(addMovieAction(formData, onSuccess, onFail));
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");

    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeValue = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    // Lấy file ra từ e
    let file = e.target.files[0];

    // Kiểm tra là hình ảnh
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }

    // Đem dữ liệu lưu vào formik
    formik.setFieldValue("hinhAnh", file);
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
      <h3 className="text-3xl">Thêm phim mới</h3>
      <Form.Item label="Tên phim">
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Mô tả">
        <TextArea rows={2} name="moTa" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>

      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeValue("dangChieu")} />
      </Form.Item>

      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeValue("hot")} />
      </Form.Item>

      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeValue("sapChieu")} />
      </Form.Item>

      <Form.Item label="Số sao">
        <InputNumber onChange={handleChangeValue("danhGia")} min={1} max={10} />
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
          src={imgSrc}
          alt="..."
        />
      </Form.Item>

      <Form.Item className="mt-0" label="Tác vụ">
        <button type="submit" className="bg-green-700 text-white p-2 rounded">
          Thêm phim
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddFilm;
