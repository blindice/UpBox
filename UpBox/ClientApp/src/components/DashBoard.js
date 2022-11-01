import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { Table, Input, Button } from "antd";
import {
  VideoCameraOutlined,
  FileTextOutlined,
  SoundOutlined,
  FileImageOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "./DashBoard.css";

const { Search } = Input;

export default function DashBoard() {
  const [files, setfiles] = useState([]);
  const [filteredFiles, setfilteredFiles] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const user = jwt(token);
      console.log(user);

      var data = JSON.stringify({
        Id: 1,
        IsDeleted: true,
        UpdatedBy: 1,
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

      console.log(response);

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
        params: { fileName: fileName, filetype: fileType },
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
      <h4 className="header-text">DashBoard</h4>
      <div>
        <Search
          className="search-input"
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => {
            handleSearch(value);
          }}
          style={{
            width: 400,
            float: "right",
          }}
        />
      </div>

      <div className="button-container">
        <Button
          type="primary"
          className="btn"
          size="large"
          icon={<VideoCameraOutlined style={{ verticalAlign: "text-top" }} />}
          onClick={() => handleSearch(fileName, "")}
          style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.5)" }}
        >
          All
        </Button>
        <Button
          type="primary"
          className="btn"
          size="large"
          icon={<VideoCameraOutlined style={{ verticalAlign: "text-top" }} />}
          onClick={() => handleSearch(fileName, 2)}
          style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.5)" }}
        >
          Videos
        </Button>
        <Button
          type="primary"
          className="btn"
          size="large"
          icon={<FileTextOutlined style={{ verticalAlign: "text-top" }} />}
          onClick={() => handleSearch(fileName, 1)}
          style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.5)" }}
        >
          {" "}
          Documents
        </Button>
        <Button
          type="primary"
          className="btn"
          size="large"
          icon={<SoundOutlined style={{ verticalAlign: "text-top" }} />}
          onClick={() => handleSearch(fileName, 3)}
          style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.5)" }}
        >
          Audios
        </Button>
        <Button
          type="primary"
          className="btn"
          size="large"
          icon={<FileImageOutlined style={{ verticalAlign: "text-top" }} />}
          onClick={() => handleSearch(fileName, 4)}
          style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.5)" }}
        >
          Images
        </Button>
      </div>
      <div className="table-container">
        <Table
          dataSource={files}
          columns={columns}
          style={{ width: "90%" }}
          className="table"
          size="small"
          pagination={{
            defaultPageSize: 10,
          }}
        />
      </div>
    </>
  );
}
