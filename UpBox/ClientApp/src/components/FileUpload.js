import React, { useEffect, useState } from "react";
import axios from "axios";
import FileDownload from "js-file-download";

export default function FileUpload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/file/getall`
      );
      console.log(`${process.env.REACT_APP_API_URL}/api/file/getall`);
      console.log(response.data.result);
      setFiles(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("fileName", fileName);
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/file/upload`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);

      await getAll();
    } catch (err) {
      console.log(err);
    }
  };

  const downloadFile = async (fileName) => {
    axios({
      url: `https://localhost:44311/api/file/download?filename=${fileName}`,
      method: "GET",
      responseType: "blob", // Important
    }).then((response) => {
      console.log(response.data);
      FileDownload(response.data, fileName);
    });
  };

  return (
    <>
      <input type="file" onChange={saveFile}></input>
      <input type="button" value="upload" onClick={uploadFile} />
      {files.length > 0 ? (
        <ul style={{ display: "flex" }}>
          {files.map((f) => {
            return (
              <li key={f.id}>
                <img
                  style={{ height: "150px", width: "150px" }}
                  src={`${process.env.REACT_APP_API_URL}/Files/Image/${f.name}`}
                ></img>
                <button onClick={async () => await downloadFile(f.name)}>
                  Download
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <h1>No File</h1>
      )}
    </>
  );
}
