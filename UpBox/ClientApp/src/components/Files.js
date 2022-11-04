import React from "react";
import { AwesomeButton } from "react-awesome-button";
import { useHistory } from "react-router-dom";
import {
  VideoCameraOutlined,
  FileTextOutlined,
  SoundOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

import "./Files.css";
// import "react-awesome-button/dist/styles.css";

export default function Files() {
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };
  return (
    <>
      <h4 className="header-text">Files</h4>
      <div className="awesome-button-container">
        <AwesomeButton
          className="aws"
          type="primary"
          style={{ height: 150, width: 650, fontSize: "50px" }}
          before={<VideoCameraOutlined style={{ marginRight: "20px" }} />}
        >
          Videos
        </AwesomeButton>
        <AwesomeButton
          className="aws"
          type="primary"
          style={{ height: 150, width: 650, fontSize: "50px" }}
          before={<FileTextOutlined style={{ marginRight: "20px" }} />}
        >
          Documents
        </AwesomeButton>
        <AwesomeButton
          className="aws"
          type="primary"
          style={{ height: 150, width: 650, fontSize: "50px" }}
          before={<FileImageOutlined style={{ marginRight: "20px" }} />}
        >
          Audios
        </AwesomeButton>
        <AwesomeButton
          className="aws"
          type="primary"
          style={{ height: 150, width: 650, fontSize: "50px" }}
          before={<SoundOutlined style={{ marginRight: "20px" }} />}
          onPress={() => {
            // do a sync/async task then call `release()`
            routeChange("/images");
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
  );
}
