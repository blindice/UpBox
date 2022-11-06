import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { Button, message, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import "./DashBoard.css";
import FileTable from "./FileTable";

export default function DashBoard() {
  const [files, setfiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [availableSpace, setAvailableSpace] = useState("");
  const [totalSpace, setTotalSpace] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (filename, filetype) => {
    try {
      setFileName(filename);
      setFileType(filetype);
    } catch (err) {
      message.error("Something went wrong 😭", 5);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const user = jwt(token);

      var data = JSON.stringify({
        Id: id,
        IsDeleted: true,
        UpdatedBy: user.id,
      });

      var config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/file/delete/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);

      message.success(`Delete success!`, 2);

      await getFiles();
    } catch (err) {
      message.error("Something went wrong 😭", 5);
    }
  };

  const getFiles = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { fileName: fileName, filetype: fileType, isDeleted: false },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/file/getbyfiletypeandname`,
        config
      );

      const data = response.data.result;

      setfiles(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error("Something went wrong 😭", 5);
    }
  };

  useEffect(() => {
    getFiles();
  }, [fileName, fileType, files.id]);

  const columns = [
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Last Edited",
      dataIndex: "lastEditedDate",
      key: "lastEditedDate",
      render: (date) => {
        let newDate = new Date(date);
        return (
          newDate.getMonth() +
          1 +
          "/" +
          newDate.getDay() +
          "/" +
          newDate.getFullYear() +
          " " +
          newDate.getHours() +
          ":" +
          newDate.getMinutes()
        );
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => {
        if (!+size) return "0 Bytes";

        const k = 1024;
        const dm = 2 < 0 ? 0 : 2;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(size) / Math.log(k));

        return `${parseFloat((size / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
      },
    },
    {
      title: "Delete",
      dataIndex: "",
      key: "x",
      render: (file) => (
        <Button
          type="primary"
          onClick={() => {
            handleDelete(file.id);
          }}
          shape="circle"
          icon={<DeleteOutlined />}
          danger
          style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.5)" }}
        ></Button>
      ),
    },
  ];
  return (
    <>
      <Spin spinning={loading} size="large">
        <h4 className="header-text">DashBoard</h4>

        <FileTable
          handleSearch={handleSearch}
          columns={columns}
          files={files}
          fileName={fileName}
        ></FileTable>
      </Spin>
    </>
  );
}
