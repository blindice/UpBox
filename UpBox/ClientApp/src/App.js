import React, { useEffect, useState } from 'react'
import { Link, useLocation, Route, Switch, useHistory } from 'react-router-dom'
import {
  AppstoreTwoTone,
  FileAddTwoTone,
  DeleteTwoTone,
  FolderTwoTone,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

import './custom.css'
import './components/App.css'
import Login from './components/Login'
import useToken from './helper/useToken'
import DashBoard from './components/DashBoard'
import Files from './components/Files'
import Uploads from './components/Uploads'
import Trash from './components/Trash'
import UserHeader from './components/UserHeader'
import Images from './components/Images'
import Main from './components/Main'
import Documents from './components/Documents'
import Videos from './components/Videos'

const { Header, Footer, Sider, Content } = Layout

export default function App() {
  const { token, setToken } = useToken()
  const location = useLocation()
  const [collapse, setCollapse] = useState(false)
  const [icon, toggleIcon] = useState(true)
  const [current, setCurrent] = useState(location.pathname)

  const onCollapse = (collapsed) => {
    setCollapse(collapsed)
  }
  const toggle = () => {
    setCollapse(!collapse)
  }

  function handleClick(e) {
    setCurrent(e.key)
  }

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname)
      }
    }
  }, [location, current])

  if (!token) {
    return (
      <>
        <div className="home-menu">
          <Link to="/" style={{ color: 'white' }}>
            Home
          </Link>
          <Link to="/login" style={{ color: 'white' }}>
            About us
          </Link>
          <Link to="/login" style={{ color: 'white' }}>
            Info
          </Link>
          <Link to="/login" style={{ color: 'white' }}>
            Login
          </Link>
        </div>
        {icon && <div className="cloud-logo"></div>}
        <div>
          <Switch>
            <Route exact path="/">
              <Main></Main>
            </Route>
            <Route exact path="/login">
              <Login setToken={setToken} toggleIcon={toggleIcon}></Login>
            </Route>
            <Route path="*">
              <NotFoundReturnToMain />
            </Route>
          </Switch>
        </div>
      </>
    )
  }
  return (
    <Layout
      style={{ minHeight: '100vh' }}
      theme="light"
      className="layout-container"
    >
      <Sider
        className="sider-menu"
        collapsed={collapse}
        onCollapse={onCollapse}
        theme="light"
      >
        <div
          className={
            collapse
              ? 'sidebar-logo-container-collapse'
              : 'sidebar-logo-container'
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
      <Layout style={{ background: '#fff' }}>
        <Header style={{ background: '#fff', padding: 0, paddingLeft: 10 }}>
          <UserHeader
            collapse={collapse}
            toggle={toggle}
            token={token}
            setToken={setToken}
          />
        </Header>
        <Content
          style={{
            margin: '0px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/file" component={Files} />
            <Route path="/upload" component={Uploads} />
            <Route path="/trash" component={Trash} />
            <Route path="/images" component={Images} />
            <Route path="/documents" component={Documents} />
            <Route path="/videos" component={Videos} />
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            background: '#fff',
            padding: '15px 50px',
          }}
        >
          Upbox ©2022
        </Footer>
      </Layout>
    </Layout>
  )
}

function NoMatch() {
  let location = useLocation()

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

function NotFoundReturnToMain() {
  const history = useHistory()
  useEffect(() => {
    history.push('/')
  })

  return <></>
}
