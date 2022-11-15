import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  Route,
  Switch,
  useHistory,
  NavLink,
} from "react-router-dom";
import {
  AppstoreTwoTone,
  FileAddTwoTone,
  DeleteTwoTone,
  FolderTwoTone,
} from "@ant-design/icons";
import { Layout, Menu, Result, Button, Progress } from "antd";
import jwt from "jwt-decode";
import axios from "axios";

import "./custom.css";
import "./components/App.css";
import Login from "./components/Login";
import useToken from "./helper/useToken";
import DashBoard from "./components/DashBoard";
import Files from "./components/Files";
import Uploads from "./components/Uploads";
import Trash from "./components/Trash";
import UserHeader from "./components/UserHeader";
import Images from "./components/Images";
import Main from "./components/Main";
import Documents from "./components/Documents";
import Videos from "./components/Videos";
import Audios from "./components/Audios";
import About from "./components/About";
import Info from "./components/Info";

const { Header, Footer, Sider, Content } = Layout;

export default function App() {
  const { token, setToken } = useToken();

  const location = useLocation();
  const [collapse, setCollapse] = useState(false);
  const [icon, toggleIcon] = useState(true);
  const [current, setCurrent] = useState(location.pathname);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sizes, setSizes] = useState({
    totalSize: "",
    availableSize: "",
    percentSize: 0,
  });

  const onCollapse = (collapsed) => {
    setCollapse(collapsed);
  };
  const toggle = () => {
    setCollapse(!collapse);
  };

  function handleClick(e) {
    setCurrent(e.key);
  }

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }

    if (!token) {
      setIsAdmin(false);
      return;
    }

    const { role } = jwt(token);
    (async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/file/getdiscsize`,
        config
      );
      const sizesData = response.data;

      setSizes({
        totalSize: convertSize(sizesData.totalSize),
        availableSize: convertSize(sizesData.availableSize),
        percentSize: getPercentSize(
          sizesData.totalSize,
          sizesData.availableSize
        ),
      });
      console.log(response.data);
    })();
    if (role.includes("admin")) setIsAdmin(true);
  }, [location, current, isAdmin, sizes.totalSize, sizes.availableSize]);

  const getPercentSize = (total, available) => {
    const usedSize = total - available;

    return ((usedSize / total) * 100).toFixed(2);
  };

  const convertSize = (size) => {
    if (!+size) return "0 Bytes";

    const k = 1024;
    const dm = 2 < 0 ? 0 : 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(size) / Math.log(k));

    return `${parseFloat((size / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  if (!token) {
    return (
      <>
        <div
          className="home-menu"
          style={{ position: "sticky", top: 0, zIndex: 1000 }}
        >
          <NavLink exact={true} to="/" style={{ color: "white" }}>
            Home
          </NavLink>
          <NavLink to="/about" style={{ color: "white" }}>
            About us
          </NavLink>
          <NavLink to="/info" style={{ color: "white" }}>
            Info
          </NavLink>
          <NavLink to="/login" style={{ color: "white" }}>
            Login
          </NavLink>
        </div>
        {icon && (
          <div className="cloud-logo">
            <img
              alt="logo"
              src="/images/cloud-logo.png"
              className="logo-image"
            ></img>
          </div>
        )}
        <div>
          <Switch>
            <Route exact path="/">
              <Main toggleIcon={toggleIcon}></Main>
            </Route>
            <Route exact path="/about">
              <About toggleIcon={toggleIcon}></About>
            </Route>
            <Route path="/info">
              <Info toggleIcon={toggleIcon}></Info>
            </Route>
            <Route path="/login">
              <Login setToken={setToken} toggleIcon={toggleIcon}></Login>
            </Route>
            <Route path="*">
              <NotFoundReturnToMain />
            </Route>
          </Switch>
        </div>
      </>
    );
  }
  return (
    <Layout
      style={{ minHeight: "100vh" }}
      theme="light"
      className="layout-container"
    >
      <Sider
        className="sider-menu"
        // collapsed={collapse}
        // onCollapse={onCollapse}
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
        <Menu onClick={handleClick} selectedKeys={[current]} mode="inline">
          <Menu.Item
            key="1"
            icon={<AppstoreTwoTone />}
            className="side-menu-item"
          >
            <span>Dashboard</span>
            <Link to="/dashboard" />
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
            style={!isAdmin && { display: "none" }}
          >
            <span>Upload</span>
            <Link to="/upload" />
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<DeleteTwoTone />}
            className="side-menu-item"
            style={!isAdmin && { display: "none" }}
          >
            <span>Trash</span>
            <Link to="/trash" />
          </Menu.Item>
        </Menu>

        <div className="storage-container">
          <Progress
            type="circle"
            percent={sizes.percentSize}
            status="active"
            width={80}
            style={{ marginLeft: "2.5em" }}
          />
          <p className="size-gauge">{` ${sizes.availableSize} free of ${sizes.totalSize}`}</p>
        </div>
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
          <Switch>
            <Route path="/dashboard">
              <DashBoard isAdmin={isAdmin} />
            </Route>
            <Route path="/file" component={Files} />
            <Route path="/upload">
              <Uploads setSizes={setSizes} />
            </Route>
            <Route path="/trash" component={Trash} />
            <Route path="/images" component={Images} />
            <Route path="/documents" component={Documents} />
            <Route path="/videos" component={Videos} />
            <Route path="/audios" component={Audios} />
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
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

function NoMatch() {
  const history = useHistory();

  return (
    <Result
      className="not-found"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push("/dashboard")}>
          Go to DashBoard
        </Button>
      }
    />
  );
}

function NotFoundReturnToMain() {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
  });

  return <></>;
}
