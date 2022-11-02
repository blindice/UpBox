import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, Card, Tooltip, Button, message } from "antd";
import FileDownload from "js-file-download";

import "./Images.css";

export default function Images() {
  const [files, setFiles] = useState([]);

  const getAll = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/file/getall`,
        config
      );

      setFiles(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const downloadFile = async (fileName) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", // Important
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/file/download?filename=${fileName}`,
        config
      )
      .then((response) => {
        FileDownload(response.data, fileName);
      })
      .catch((err) => message.error("Something went wrong 😭", 5));
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <h4 className="header-text">Images</h4>
      <div className="image-container">
        <Image.PreviewGroup>
          {files
            .filter((f) => {
              return (
                (f.name.toLowerCase().includes("apng") ||
                  f.name.toLowerCase().includes("avif") ||
                  f.name.toLowerCase().includes("gif") ||
                  f.name.toLowerCase().includes("jpg") ||
                  f.name.toLowerCase().includes("jpeg") ||
                  f.name.toLowerCase().includes("jfif") ||
                  f.name.toLowerCase().includes("pjpeg") ||
                  f.name.toLowerCase().includes("pjp") ||
                  f.name.toLowerCase().includes("png") ||
                  f.name.toLowerCase().includes("svg") ||
                  f.name.toLowerCase().includes("webp")) &&
                !f.isDeleted
              );
            })
            .map((f) => {
              return (
                <Tooltip placement="bottom" title={f.name}>
                  <Card
                    style={{
                      width: 200,
                      height: 200,
                      textAlign: "center",
                    }}
                    hoverable
                    cover={
                      <Image
                        alt={f.name}
                        style={{
                          height: "auto",
                          maxHeight: 100,
                          width: "auto",
                          maxWidth: 200,
                        }}
                        src={`${process.env.REACT_APP_API_URL}/Files/Image/${f.name}`}
                      />
                    }
                  >
                    <Card.Meta title={f.name} />
                    <Button
                      type="primary"
                      size="small"
                      style={{ marginTop: 20, width: "100%" }}
                      onClick={() => downloadFile(f.name)}
                    >
                      Download
                    </Button>
                  </Card>
                </Tooltip>
              );
            })}
        </Image.PreviewGroup>
      </div>
    </>
  );
}
