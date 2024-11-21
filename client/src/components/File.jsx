import React from "react";
import { getRequest } from "../functions/getRequest";
import { useState, useEffect } from "react";
import { deleteRequest } from "../functions/deleteRequest";

export default function File({ filename, foldername, username, onDelete }) {
  const [file, setFile] = useState(null);

  async function handleGetRequest() {
    const fileContent = await getRequest(
      `${username}/${foldername}/${filename}`,
      "files"
    );
    setFile(fileContent);
  }

  async function handleDeleteRequest() {
    const deletedFile = await deleteRequest(
      "files",
      `${username}/${foldername}/${filename}`
    );
    console.log(deletedFile);
    if (deletedFile) {
      console.log("hello");
      onDelete();
    }
  }
  return (
    <div className="file-card">
      <div>{filename}</div>
      <button onClick={() => handleGetRequest()}>Show Content</button>
      <button onClick={() => handleDeleteRequest()}>Delete File</button>

      {file && <div>{file.fileContent}</div>}
    </div>
  );
}
