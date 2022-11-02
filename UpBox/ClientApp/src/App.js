import React, { useState } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import {
  AppstoreTwoTone,
  FileAddTwoTone,
  DeleteTwoTone,
  FolderTwoTone,
} from "@ant-design/icons";
import { Layout, Menu, Spin } from "antd";

import "./custom.css";
import "./components/App.css";
import Login from "./components/Login";
import useToken from "./helper/useToken";
import DashBoard from "./components/DashBoard";
import Files from "./components/Files";
import Uploads from "./components/Uploads";
import Trash from "./components/Trash";
import UserHeader from "./components/UserHeader";

const { Header, Footer, Sider, Content } = Layout;

export default function App() {
  const { token, setToken } = useToken();
  const [collapse, setCollapse] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapse(collapsed);
  };
  const toggle = () => {
    setCollapse(!collapse);
  };

  if (!token) {
    return <Login setToken={setToken}></Login>;
  }
  return (
    <Layout
      style={{ minHeight: "100vh" }}
      theme="light"
      className="layout-container"
    >
      <Sider
        className="side-menu"
        collapsed={collapse}
        onCollapse={onCollapse}
        theme="light"
      >
        <div
          className={
            collapse
              ? "sidebar-logo-container-collapse"
              : "sidebar-logo-container"
          }
        >
          <p className="sidebar-logo">U</p>
          <p className="sidebar-logo">p</p>
          <p className="sidebar-logo">B</p>
          <p className="sidebar-logo">o</p>
          <p className="sidebar-logo">x</p>
        </div>
        <Menu defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="1"
            icon={<AppstoreTwoTone />}
            className="side-menu-item"
          >
            <span>Dashboard</span>
            <Link to="/" />
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<FolderTwoTone />}
            className="side-menu-item"
          >
            <span>Files</span>
            <Link to="/file" />
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<FileAddTwoTone />}
            className="side-menu-item"
          >
            <span>Upload</span>
            <Link to="/upload" />
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<DeleteTwoTone />}
            className="side-menu-item"
          >
            <span>Trash</span>
            <Link to="/trash" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ background: "#fff" }}>
        <Header style={{ background: "#fff", padding: 0, paddingLeft: 10 }}>
          <UserHeader
            collapse={collapse}
            toggle={toggle}
            token={token}
            setToken={setToken}
          />
        </Header>
        <Content
          style={{
            margin: "0px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          <Route exact path="/" component={DashBoard} />
          <Route path="/file" component={Files} />
          <Route path="/upload" component={Uploads} />
          <Route path="/trash" component={Trash} />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#fff",
            padding: "15px 50px",
          }}
        >
          Upbox ©2022
        </Footer>
      </Layout>
    </Layout>
  );
}
