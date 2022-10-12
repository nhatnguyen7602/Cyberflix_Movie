import { Form, Input, message, Switch } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userServ } from "../../../../Services/userServies";

const AddUser = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      hoTen: "",
      matKhau: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "KhachHang",
      maNhom: "GP03",
    },

    onSubmit: (values) => {
      const onSuccess = () => {
        message.success("Thêm phim người dùng thành công!");
        setTimeout(() => {
          navigate("/admin/user");
        }, 2000);
      };

      const onFail = (mess) => {
        message.error(mess);
      };

      userServ
        .themNguoiDung(values)
        .then(() => {
          onSuccess();
        })
        .catch((err) => {
          onFail(err.response?.data);
        });
    },
  });

  const handleChangeValue = (name) => {
    return (value) => {
      if (value === true) {
        formik.setFieldValue(name, "QuanTri");
      } else {
        formik.setFieldValue(name, "KhachHang");
      }
    };
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
      <h3 className="text-3xl">Thêm người dùng</h3>
      <Form.Item label="Tài khoản">
        <Input name="taiKhoan" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Họ tên">
        <Input name="hoTen" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Mật khẩu">
        <Input name="matKhau" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Email">
        <Input name="email" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Điện thoại">
        <Input name="soDt" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Quản trị" valuePropName="checked">
        <Switch onChange={handleChangeValue("maLoaiNguoiDung")} />
      </Form.Item>

      <Form.Item className="mt-0" label="Tác vụ">
        <button type="submit" className="bg-green-700 text-white p-2 rounded">
          Thêm người dùng
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddUser;
