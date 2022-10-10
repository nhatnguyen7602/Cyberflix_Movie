import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import React from "react";
import { NavLink } from "react-router-dom";
const { Sider, Content } = Layout;

export default function LayoutComponent({ Component }) {
  return (
    <Layout>
      <Sider collapsible>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.SubMenu title="Phim" icon={<VideoCameraOutlined />}>
            <Menu.Item key="1">
              <NavLink to="/admin">Quản lý phim</NavLink>
            </Menu.Item>

            <Menu.Item key="2">
              <NavLink to="/admin/addfilm">Thêm phim</NavLink>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu title="Người dùng" icon={<UserOutlined />}>
            <Menu.Item key="3">
              <NavLink to="/admin/user">Quản lý user</NavLink>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>

      <Layout>
        <Content
          style={{
            padding: 12,
            minHeight: "100vh",
          }}
        >
          <Component />
        </Content>
      </Layout>
    </Layout>
  );
}
