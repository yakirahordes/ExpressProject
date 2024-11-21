import React from "react";
import { getRequest } from "../functions/getRequest";
import { useState } from "react";

export default function File({ filename, foldername, username }) {
  const [file, setFile] = useState([]);

  async function handleGetRequest() {
    const fileContent = await getRequest(
      `${username}/${foldername}/${filename}`,
      "files"
    );
    setFile(fileContent);
  }
  async function handleDeleteRequest() {
    await deleteREquest("files", `${username}/${foldername}/${filename}`);
  }
  return (
    <>
      <div>{filename}</div>
      <button onClick={() => handleGetRequest()}>show file content</button>
      <button onClick={() => handleDeleteRequest()}>Delete file</button>

      <div>{file.fileContent}</div>
    </>
  );
}
