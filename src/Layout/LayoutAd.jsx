import { Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Sider, Content } = Layout;

export default function LayoutComponent({ Component }) {
  return (
    <Layout>
      <Sider>
        <Link to="/admin">
          <div className=" text-white text-center py-3 bg-blue-500">
            Quản lý phim
          </div>
        </Link>

        <Link to="/admin/user">
          <div className=" text-white text-center py-3">Quản lý người dùng</div>
        </Link>

        <Link to="/admin/addfilm">
          <div className=" text-white text-center py-3">Thêm phim</div>
        </Link>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 24,
            height: "100vh",
          }}
        >
          <Component />
        </Content>
      </Layout>
    </Layout>
  );
}
