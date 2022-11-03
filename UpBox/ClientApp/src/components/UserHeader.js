import React, { useEffect, useState } from "react";
import {
  LeftCircleTwoTone,
  RightCircleTwoTone,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import jwt from "jwt-decode";
import { Button, Tooltip, Modal } from "antd";
import { useHistory } from "react-router-dom";

import "./UserHeader.css";

export default function UserHeader({ collapse, toggle, token, setToken }) {
  const [user, setUser] = useState("");
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    history.push("/");
  };

  const confirm = () => {
    Modal.confirm({
      title: "Log-out",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to Log-out?",
      okText: "Yes",
      cancelText: "No",
      cancelButtonProps: { type: "primary", danger: true },
      onOk: handleLogout,
    });
  };

  useEffect(() => {
    const payload = jwt(token);
    setUser(payload.name);
  }, []);

  return (
    <>
      <span
        className="trigger"
        type={collapse ? "menu-unfold" : "menu-fold"}
        style={{ cursor: "pointer" }}
        onClick={toggle}
      >
        {collapse ? <RightCircleTwoTone /> : <LeftCircleTwoTone />}
      </span>
      <div className="user-header">
        <span className="user-name">{user.toUpperCase()}</span>
        <Tooltip placement="bottom" title="Log-out">
          <Button
            type="primary"
            shape="circle"
            icon={<LogoutOutlined />}
            danger
            onClick={confirm}
          />
        </Tooltip>
      </div>
    </>
  );
}
