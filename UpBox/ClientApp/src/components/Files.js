import React from 'react'
import { AwesomeButton } from 'react-awesome-button'
import { useHistory } from 'react-router-dom'
import {
  VideoCameraOutlined,
  FileTextOutlined,
  SoundOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'

import './Files.css'
// import "react-awesome-button/dist/styles.css";

export default function Files() {
  const history = useHistory()
  const isSmallScreen = useMediaQuery({ query: `(max-width: 1366px)` })

  const buttonStyle = isSmallScreen
    ? { height: 100, width: 325, fontSize: '25px' }
    : { height: 150, width: 650, fontSize: '50px' }

  const routeChange = (path) => {
    history.push(path)
  }
  return (
    <>
      <h4 className="header-text">Files</h4>
      <div className="awesome-button-container">
        <AwesomeButton
          className="aws"
          type="primary"
          style={buttonStyle}
          before={<VideoCameraOutlined style={{ marginRight: '20px' }} />}
          onPress={() => {
            // do a sync/async task then call `release()`
            routeChange('/videos')
          }}
        >
          Videos
        </AwesomeButton>
        <AwesomeButton
          className="aws"
          type="primary"
          style={buttonStyle}
          before={<FileTextOutlined style={{ marginRight: '20px' }} />}
          onPress={() => {
            // do a sync/async task then call `release()`
            routeChange('/documents')
          }}
        >
          Documents
        </AwesomeButton>
        <AwesomeButton
          className="aws"
          type="primary"
          style={buttonStyle}
          before={<FileImageOutlined style={{ marginRight: '20px' }} />}
          onPress={() => {
            // do a sync/async task then call `release()`
            routeChange('/audios')
          }}
        >
          Audios
        </AwesomeButton>
        <AwesomeButton
          className="aws"
          type="primary"
          style={buttonStyle}
          before={<SoundOutlined style={{ marginRight: '20px' }} />}
          onPress={() => {
            // do a sync/async task then call `release()`
            routeChange('/images')
          }}
        >
          Images
        </AwesomeButton>
      </div>
      {/* <AwesomeButton
        type="primary"
        style={{ height: 100, width: 500, fontSize: "100px" }}
        before={<InboxOutlined />}
      >
        Primary
      </AwesomeButton> */}
    </>
  )
}
