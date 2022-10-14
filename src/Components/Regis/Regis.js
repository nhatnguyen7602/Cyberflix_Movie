import React from "react";
import { Button, message, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import bg_animate3 from "../../Assets/bg_animate3.json";
import Lottie from "lottie-react";
import { setUserRegisActionServ } from "../../Redux/actions/actionUsers";

export default function Regis() {
  // chuyển hướng trang bằng useNavigate từ react-router
  let navigate = useNavigate();
  // tạo dispatch để sử dụng redux
  let dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("values: ", values);
    if (values.matKhauCheck !== values.matKhau) {
      message.warning(
        "Mật khẩu nhập lại không trùng nhau, vui lòng kiểm tra lại! "
      );
    } else {
      //tạo dataRegis bằng mảng lấy từ value, thêm các key
      let dataPlus = { maNhom: "GP00", maLoaiNguoiDung: "khachHang" };
      let dataRegis = { ...values, ...dataPlus };
      console.log("dataRegis: ", dataRegis);
      // tạo 2 func callBack: onSuccess, onFail cho setUserRegisActionServ
      let onSuccess = () => {
        // hiện thị message
        message.success("Đăng ký thành công, vui lòng đăng nhập lại");
        // chuyển hướng sang trang đăng nhập sau 2s
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      };
      let onFail = () => {
        message.error("Đăng ký thất bại!");
      };
      // // dispatch value sử dụng action từ actionUser kèm 2 callback func lên action
      dispatch(setUserRegisActionServ(dataRegis, onSuccess, onFail));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className='container mx-auto flex items-center justify-center'>
      <div className='w-1/2 h-full'>
        <Lottie animationData={bg_animate3}></Lottie>
      </div>
      <div className='w-1/3 h-full'>
        <p className='underline mt-5'> Đăng kí tài khoản mới: </p>
        <Form
          className='w-full '
          layout='vertical'
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={
            {
              // remember: true,
            }
          }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'>
          <Form.Item
            label='Tên tài khoản'
            name='taiKhoan'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào tên tài khoản!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Password'
            name='matKhau'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào Password!",
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Nhập lại Password '
            name='matKhauCheck'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại Password!",
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Họ tên'
            name='hoTen'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào họ tên!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='email'
            name='email'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào email!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Số điện thoại'
            name='soDt'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào số điện thoại!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 9,
              span: 24,
            }}>
            <Button type='primary' htmlType='submit'>
              Đăng kí
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
