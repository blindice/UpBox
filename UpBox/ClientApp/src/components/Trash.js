import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import { Button, message } from "antd";
import { UndoOutlined } from "@ant-design/icons";

import FileTable from "./FileTable";

export default function Trash() {
  const [files, setfiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");

  const handleSearch = (filename, filetype) => {
    try {
      setFileName(filename);
      setFileType(filetype);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestore = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const user = jwt(token);
      console.log(user);

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

      console.log(response);

      message.success(`Restore success!`);

      await getFiles();
    } catch (err) {
      console.log(err);
    }
  };

  const getFiles = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFiles();
  }, [fileName, fileType, files.id]);

  const columns = [
    {
      title: "FIle Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Last Edited",
      dataIndex: "lastEditedDate",
      key: "lastEditedDate",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
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
  ];
  return (
    <>
      <h4 className="header-text">Trash</h4>
      <FileTable
        handleSearch={handleSearch}
        columns={columns}
        files={files}
        fileName={fileName}
      ></FileTable>
    </>
  );
}
