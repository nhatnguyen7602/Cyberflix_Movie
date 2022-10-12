import { Form, Input, message, Switch } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInfoUserAction } from "../../../../Redux/actions/actionAdmin";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../../Redux/actions/actionSpinner";
import { userServ } from "../../../../Services/userServies";

const EditUser = () => {
  const { userEditInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tk } = useParams();

  const dataTk = { taiKhoan: tk };

  useEffect(() => {
    dispatch(getInfoUserAction(dataTk));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userEditInfo.taiKhoan,
      hoTen: userEditInfo.hoTen,
      matKhau: userEditInfo.matKhau,
      email: userEditInfo.email,
      soDt: userEditInfo.soDT,
      maLoaiNguoiDung: "KhachHang",
      maNhom: "GP03",
    },

    onSubmit: (values) => {
      dispatch(setLoadingOnAction());

      const onSuccess = () => {
        message.success("Cập nhật thành công!");
        setTimeout(() => {
          navigate("/admin/user");
        }, 2000);
      };

      const onFail = (mess) => {
        message.error(mess);
      };

      userServ
        .updateUserInfo(values)
        .then(() => {
          dispatch(setLoadingOffAction());

          onSuccess();
        })
        .catch((err) => {
          dispatch(setLoadingOffAction());

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
      <h3 className="text-3xl">
        Cập Nhật tài khoản{" "}
        <span className="text-red-600">{formik.values.taiKhoan}</span>
      </h3>

      <Form.Item label="Họ tên">
        <Input
          name="hoTen"
          value={formik.values.hoTen}
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item label="Mật khẩu">
        <Input
          name="matKhau"
          value={formik.values.matKhau}
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item label="Email">
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item label="Điện thoại">
        <Input
          name="soDt"
          value={formik.values.soDt}
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item label="Quản trị" valuePropName="checked">
        <Switch onChange={handleChangeValue("maLoaiNguoiDung")} />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <button type="submit" className="bg-green-700 text-white p-2 rounded">
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};

export default EditUser;
