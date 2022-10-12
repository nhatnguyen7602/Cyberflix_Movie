import { Form, Input, message, Switch } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInfoUserAction } from "../../../../Redux/actions/actionAdmin";
import { userServ } from "../../../../Services/userServies";

const EditUser = () => {
  const { userEditInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tk } = useParams();

  useEffect(() => {
    dispatch(getInfoUserAction(tk));
  }, []);

  const userInfo = userEditInfo[0];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userInfo.taiKhoan,
      hoTen: userInfo.hoTen,
      matKhau: userInfo.matKhau,
      email: userInfo.email,
      soDt: userInfo.soDt,
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
      maNhom: "GP03",
    },

    onSubmit: (values) => {
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

  const valueChecked = (value) => {
    if (value == "QuanTri") {
      return true;
    } else {
      return false;
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
        <Switch
          onChange={handleChangeValue("maLoaiNguoiDung")}
          checked={valueChecked(formik.values.maLoaiNguoiDung)}
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

export default EditUser;
