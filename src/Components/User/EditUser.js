import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form, Input, message } from "antd";
import { setUserEditActionServ } from "../../Redux/actions/actionUsers";
export default function EditUser({ data }) {
  console.log("data EditUserPage: ", data);
  // tạo dispatch để sử dụng redux
  let dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // tạo biến initiavalues
  let hoTen = data.hoTen;
  let email = data.email;
  let soDT = data.soDT;

  // modal setting
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // button submit
  const onFinish = (values) => {
    console.log("Success:", values);

    //tạo dataEdit bằng mảng lấy từ value, thêm các key
    let dataPlus = { maNhom: "GP04", maLoaiNguoiDung: "khachHang" };
    let dataEdit = { ...values, ...dataPlus };
    console.log("dataEdit: ", dataEdit);
    // tạo 2 func callBack: onSuccess, onFail cho setUserRegisActionServ
    let onSuccess = () => {
      // hiện thị message
      message.success("Cập nhật thành công!");
    };
    let onFail = () => {
      message.error("Cập nhật thất bại");
    };
    // // dispatch value sử dụng action từ actionUser kèm 2 callback func lên action
    dispatch(setUserEditActionServ(dataEdit, onSuccess, onFail));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button type='danger' onClick={showModal}>
        Sửa
      </Button>
      <Modal
        title={`Thay đổi thông tin người dùng: ${data.hoTen}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
          autoComplete='off'>
          <Form.Item label='Tên tài khoản' name='taiKhoan'>
            {" "}
            <Input placeholder={data.taiKhoan} disabled={true} />
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
            <Input placeholder={hoTen} />
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
            <Input placeholder={email} />
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
            <Input placeholder={soDT} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 24,
            }}>
            <Button type='primary' htmlType='submit'>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
