import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, DatePicker, Rate, Form, Input, message } from "antd";
import { setUserEditActionServ } from "../../Redux/actions/actionUsers";
import TextArea from "antd/lib/input/TextArea";
export default function EditUser({ data }) {
  // tạo dispatch để sử dụng redux
  let dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [danhGia, setDanhGia] = useState(Number(data.danhGia));
  // const [rate, setRate] = useState(Number(danhGia));
  // console.log("rate state: ", rate);
  // tạo biến initiavalues
  let tenPhim = data.tenPhim;
  let hinhAnh = data.hinhAnh;
  let maNhom = data.maNhom;
  let moTa = data.moTa;
  let ngayKhoiChieu = data.ngayKhoiChieu;
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
  //config date picker
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
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
    <div>
      <Button type='danger' onClick={showModal}>
        Sửa
      </Button>
      <Modal
        width={700}
        title={`Thay đổi thông tin phim: ${data.tenPhim}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='w-full '
          layout='horizontal'
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
          <Form.Item label='Tên Phim' disabled={true}>
            <Input placeholder={tenPhim} />
          </Form.Item>
          <Form.Item label='Ngày khởi chiếu' {...config}>
            <DatePicker
              initialValues={ngayKhoiChieu}
              onFieldsChange={(ngayKhoiChieu) => {
                console.log("ngayKhoiChieu: ", ngayKhoiChieu);
              }}
              showTime
              format='YYYY-MM-DD HH:mm:ss'
            />
          </Form.Item>
          <Form.Item label='Đánh giá'>
            <Rate
              initialValues={danhGia}
              defaultValue={danhGia}
              allowClear={false}
              value={danhGia}
              count={10}
              onChange={(value) => {
                setDanhGia(value);
              }}
            />
          </Form.Item>
          <Form.Item
            label='Hình Ảnh'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào url hình ảnh!",
              },
            ]}>
            <Input placeholder={hinhAnh} />
          </Form.Item>
          <Form.Item
            label='Mô tả'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào Mô tả!",
              },
            ]}>
            <TextArea placeholder={moTa} maxLength={60000} />
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
    </div>
  );
}
