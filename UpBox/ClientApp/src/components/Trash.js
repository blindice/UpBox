import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import { Button, message, Spin } from "antd";
import { UndoOutlined, DeleteOutlined } from "@ant-design/icons";

import FileTable from "./FileTable";

export default function Trash({ setSizes }) {
  const [files, setfiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (filename, filetype) => {
    try {
      setFileName(filename);
      setFileType(filetype);
    } catch (err) {
      message.error("Something went wrong 😭", 5);
    }
  };

  const handleRestore = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const user = jwt(token);

      var data = JSON.stringify({
        Id: id,
        IsDeleted: false,
        UpdatedBy: user.id,
      });

      var config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/file/restore/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);

      message.success(`Restore success 😊`, 2);

      await getFiles();
    } catch (err) {
      message.error("Something went wrong 😭", 5);
    }
  };

  const handlePermaDelete = async (id) => {
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
        url: `${process.env.REACT_APP_API_URL}/api/file/permadelete/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);

      (async () => {
        try {
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
        } catch (err) {
          console.log(err);
        }
      })();

      message.success(`Delete success!`, 2);

      await getFiles();
    } catch (err) {
      console.log(err);
      message.error("Something went wrong 😭", 5);
    }
  };

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

  const getFiles = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { fileName: fileName, filetype: fileType, isDeleted: true },
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
      title: "Restore",
      dataIndex: "",
      key: "x",
      render: (file) => (
        <Button
          type="primary"
          onClick={() => {
            handleRestore(file.id);
          }}
          shape="circle"
          icon={<UndoOutlined />}
          style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.5)" }}
        ></Button>
      ),
    },
    {
      title: "Delete Permanently",
      dataIndex: "",
      key: "x",
      render: (file) => (
        <Button
          type="primary"
          onClick={() => {
            handlePermaDelete(file.id);
          }}
          shape="circle"
          icon={<DeleteOutlined />}
          style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.5)" }}
          danger
        ></Button>
      ),
    },
  ];
  return (
    <>
      <Spin spinning={loading} size="large">
        <h4 className="header-text">Trash</h4>
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
