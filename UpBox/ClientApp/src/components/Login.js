import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Form, Input, Button, notification } from 'antd'
import { useHistory } from 'react-router-dom'

import './Login.css'
// import { Input } from 'reactstrap'

export default function Login({ setToken, toggleIcon }) {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const usernameRef = useRef(null)

  const login = async (value) => {
    try {
      setLoading(true)
      var response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/account/login`,
        value,
      )
      var data = response.data
      if (data.isSuccess) {
        setToken(data.result)
      } else {
        throw new Error(data.Message)
      }

      setLoading(false)
      history.push('/dashboard')
    } catch (err) {
      history.push('/login')
      openNotification(err.message)
      setLoading(false)
    }
  }

  const openNotification = (message) => {
    notification.error({
      message: `${message}`,
      placement: 'bottomRight',
    })
  }

  useEffect(() => {
    toggleIcon(false)
    usernameRef.current.focus()
  })

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
              message: 'Please input your username!',
            },
          ]}
        >
          <Input
            ref={usernameRef}
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
              message: 'Please input your password!',
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
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}
