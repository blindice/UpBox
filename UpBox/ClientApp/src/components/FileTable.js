import React from "react";
import { Table, Input, Button, message } from "antd";
import {
  VideoCameraOutlined,
  FileTextOutlined,
  SoundOutlined,
  FileImageOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Search } = Input;

export default function FileTable({ handleSearch, columns, files, fileName }) {
  return (
    <>
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
