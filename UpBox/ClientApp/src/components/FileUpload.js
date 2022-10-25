import React, { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <input type="file" onChange={saveFile}></input>
      <input type="button" value="upload" onClick={uploadFile} />
    </>
  );
}
