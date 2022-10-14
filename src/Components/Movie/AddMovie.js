import React from "react";
import { customAlphabet } from "nanoid";
import {
  Button,
  Select,
  Modal,
  DatePicker,
  Rate,
  Form,
  Input,
  message,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { moviesServ } from "../../Services/moviesServices";
const AddMovie = ({}) => {
  // tạo dispatch để sử dụng redux
  let dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // tạo biến initiavalues
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
  // form setting
  const onFinish = (values) => {
    console.log("Success:", values);
    //tạo dataEdit bằng mảng lấy từ value, thêm các key
    // tạo id cho phim bằng nanoid
    const nanoid = customAlphabet("1234567890", 6);
    let maPhim = nanoid();
    console.log("maPhim: ", maPhim);
    let dataPlus = { maNhom: "GP03", maPhim: maPhim };
    let dataEdit = { ...values, ...dataPlus };
    console.log("dataEdit: ", dataEdit);
    let handleAddMovie = () => {
      moviesServ
        .addMovie(dataEdit)
        .then((res) => {
          console.log(res);
          message.success("Thêm phim thành công!");
        })
        .catch((err) => {
          console.log(err);
          message.error("Không thể thêm phim!");
        });
    };
    handleAddMovie();
    // tạo 2 func callBack: onSuccess, onFail cho setMovieEditActionServ
    // let onSuccess = () => {
    //   // hiện thị message
    //   message.success("Cập nhật thành công!");
    // };
    // let onFail = () => {
    //   message.error("Cập nhật thất bại");
    // };
    // // dispatch value sử dụng action từ actionMovie kèm 2 callback func lên action
    // dispatch(setUserEditActionServ(dataEdit, onSuccess, onFail));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className='mb-5'>
      <Button type='primary' onClick={showModal}>
        Thêm Phim
      </Button>
      <Modal
        width={900}
        title='Thêm phim'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className='modalEdit'>
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
          <Form.Item label='Tên Phim' name='tenPhim'>
            <Input
              placeholder='Tên phim'
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập vào tên phim",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label='Ngày khởi chiếu' name='ngayKhoiChieu' {...config}>
            <DatePicker
              onFieldsChange={(ngayKhoiChieu) => {
                console.log("ngayKhoiChieu: ", ngayKhoiChieu);
              }}
              showTime
              format='YYYY-MM-DD HH:mm:ss'
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày khởi chiếu",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label='Đánh giá' name='danhGia'>
            <Rate
              count={10}
              onChange={(value) => {
                console.log("value: ", value);
              }}
            />
          </Form.Item>
          {/* Hình ảnh */}
          <Form.Item
            name='hinhAnh'
            label='Hình Ảnh'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào url Poster phim!",
              },
            ]}>
            <Input placeholder='Url poster' />
          </Form.Item>
          <Form.Item
            label='Trailer'
            name='trailer'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào url Trailer",
              },
            ]}>
            <Input placeholder='Url trailer phim' />
          </Form.Item>
          <Form.Item
            name='moTa'
            label='Mô tả'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào Mô tả!",
              },
            ]}>
            <TextArea placeholder='Mô tả phim' maxLength={6000} />
          </Form.Item>
          <Form.Item label='Tình trạng' name='tinhTrang'>
            <Select placeholder='Chọn tình trạng của phim'>
              <Select.Option value='dangChieu'>Đang chiếu</Select.Option>
              <Select.Option value='sapChieu'>Sắp chiếu</Select.Option>
            </Select>
          </Form.Item>
          {/* upload hình ảnh*/}
          <Form.Item name='hinhAnh' label='Upload'>
            <input type='file' />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 11,
              span: 24,
            }}>
            <Button type='primary' htmlType='submit'>
              Thêm phim
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddMovie;
