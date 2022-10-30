import React, { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import {
  AppstoreTwoTone,
  FileAddTwoTone,
  DeleteTwoTone,
  FolderTwoTone,
  LeftCircleTwoTone,
  RightCircleTwoTone,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";

import "./custom.css";
import "./components/App.css";
import Login from "./components/Login";
import useToken from "./helper/useToken";

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
    // <FileUpload></FileUpload>
    // <Layout>
    //   <Route exact path="/" component={Home} />
    //   <Route path="/counter" component={Counter} />
    //   <Route path="/fetch-data" component={FetchData} />
    // </Layout>
    <Layout style={{ minHeight: "100vh" }} theme="light">
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
            <Link to="/files" />
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<FileAddTwoTone />}
            className="side-menu-item"
          >
            <span>Upload</span>
            <Link to="/meseros" />
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<DeleteTwoTone />}
            className="side-menu-item"
          >
            <span>Trash</span>
            <Link to="/meseros" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#f0f2f5", padding: 0, paddingLeft: 10 }}>
          <span
            className="trigger"
            type={collapse ? "menu-unfold" : "menu-fold"}
            style={{ cursor: "pointer" }}
            onClick={toggle}
          >
            {collapse ? <RightCircleTwoTone /> : <LeftCircleTwoTone />}
          </span>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#f0f2f5",
            minHeight: 280,
          }}
        >
          {/* <Route exact path="/" component={<Counter />} />
          <Route path="/meseros" component={<FetchData />} /> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>Upbox ©2022</Footer>
      </Layout>
    </Layout>
  );
}
