import React from "react";
import { Form, Cascader, DatePicker, InputNumber } from "antd";
import { Button } from "antd/lib/radio";

export default function CreateScheduleFilm() {
  const handleChangeTheaterSystems = (values) => {};

  const onOk = (values) => {};

  const onChangeDate = (values) => {};

  const onChangeInputNumber = (values) => {};

  return (
    <div className="container">
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <h3 className="text-2xl">Tạo lịch chiếu</h3>
        <Form.Item label="Hệ thống rạp">
          <Cascader
            options={[
              { label: "AAA", value: "AAA" },
              { label: "aaa", value: "aaa" },
            ]}
            onChange={handleChangeTheaterSystems}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Cascader
            options={[
              { label: "AAA", value: "AAA" },
              { label: "aaa", value: "aaa" },
            ]}
            onChange={handleChangeTheaterSystems}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>

        <Form.Item label="Ngày - Giờ chiếu">
          <DatePicker showTime onChange={onChangeDate} onOk={onOk} />
        </Form.Item>

        <Form.Item label="Ngày - Giờ chiếu">
          <InputNumber
            min={75000}
            max={150000}
            onChange={onChangeInputNumber}
          />
        </Form.Item>

        <Form.Item label="Chức năng">
          <Button type="primary">Tạo lịch chiếu</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
