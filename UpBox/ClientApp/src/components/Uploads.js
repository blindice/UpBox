import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import jwt from "jwt-decode";

import "./Uploads.css";

const { Dragger } = Upload;

export default function Uploads() {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = jwt(token);

  const props = {
    name: "file",
    action: `${process.env.REACT_APP_API_URL}/api/file/upload`,
    headers: {
      Authorization: `Bearer ${token}`,
      UpdatedBy: user.id,
    },
    beforeUpload: (file) => {
      console.log(file.size);

      //if ile is greater than 100mb
      if (file.size > 104857600) {
        message.error(`${file.name} size is too large 😡`, 5);
        return false;
      }
      return true;
    },
    onChange(info) {
      try {
        const { status } = info.file;
        // console.log(status);

        if (status !== "uploading") {
          console.log(`Uploading ${info.file.name}`);
        }

        if (status === "done") {
          message.success(`${info.file.name} file upload success 😊 `, 2);
        } else if (status === "error") {
          message.error(
            `${info.file.name} file upload failed. ${info.file.response.Message} 😭`,
            5,
            5
          );
        }
      } catch (err) {
        message.error("Something went wrong 😭", 5);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <>
      <h4 className="header-text">Upload</h4>
      <div className="upload-container">
        <Dragger maxCount={1} {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p style={{ color: "#1890ff" }}>File size limit is 100mb</p>
        </Dragger>
      </div>
    </>
  );
}
