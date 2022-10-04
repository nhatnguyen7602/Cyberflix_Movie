import React from "react";
import { Button, message, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import bg_animate2 from "../../Assets/bg_animate2.json";
import Lottie from "lottie-react";
import { setUserLoginActionServ } from "../../Redux/actions/actionUsers";

export default function LoginPage() {
  // chuyển hướng trang bằng useNavigate từ react-router
  let navigate = useNavigate();
  // tạo dispatch để sử dụng redux
  let dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    // tạo 2 func callBack: onSuccess, onFail cho setUserLoginActionServ
    let onSuccess = () => {
      // hiện thị message
      message.success("Đăng nhập thành công");
      // chuyển hướng sang trang chủ sau 1s
      setTimeout(() => {
        navigate("/");
      }, 1000);
    };
    let onFail = () => {
      message.error("Đăng nhập thất bại");
    };
    // dispatch value sử dụng action từ actionUser kèm 2 callback func lên action
    dispatch(setUserLoginActionServ(values, onSuccess, onFail));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className='container mx-auto flex items-center justify-center'>
      <div className='w-1/2 h-full'>
        <Lottie animationData={bg_animate2}></Lottie>
      </div>
      <div className='w-1/3 h-full'>
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
            label='Username'
            name='taiKhoan'
            rules={[
              {
                required: true,
                message: "Please input your username!",
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
                message: "Please input your password!",
              },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 9,
              span: 24,
            }}>
            <Button type='danger' htmlType='submit'>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
