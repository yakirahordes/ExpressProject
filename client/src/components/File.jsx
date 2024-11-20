import React from "react";
import { getRequest } from "../functions/getRequest";
import { useState } from "react";

export default function File({ filename, foldername, username }) {
  const [file, setFile] = useState([]);

  async function handleGetRequest() {
    const fileContent = await getRequest(
      "files",
      `${username}/${foldername}/${filename}`
    );
    console.log("fileContent: ", fileContent);

    setFile(fileContent);
  }
  return (
    <>
      <div>{filename}</div>
      <button onClick={() => handleGetRequest()}>show file content</button>
      <div>{file.fileContent}</div>
    </>
  );
}
