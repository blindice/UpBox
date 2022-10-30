import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, notification } from "antd";

import "./Login.css";

export default function Login({ setToken }) {
  const [loading, setLoading] = useState(false);
  const login = async (value) => {
    try {
      setLoading(true);
      var response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/account/login`,
        value
      );
      var data = response.data;
      console.log(data);
      if (data.isSuccess) {
        console.log(data.result);
        setToken(data.result);
      } else {
        console.log(data.Message);
        openNotification(data.Message);
      }

      setLoading(false);
    } catch (err) {
      openNotification(err.message);
    }
  };

  const openNotification = (message) => {
    notification.error({
      message: `${message}`,
      placement: "bottomRight",
    });
  };

  return (
    <div className="login-container">
      <Form className="login-form" onFinish={login}>
        <Form.Item>
          <h1 className="logo">UpBox</h1>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
