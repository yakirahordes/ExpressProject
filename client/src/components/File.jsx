import React from "react";
import { getRequest } from "../functions/getRequest";
import { useState, useEffect } from "react";
import { deleteRequest } from "../functions/deleteRequest";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function File({ username }) {
  const [file, setFile] = useState(null);
  const [usersFiles, setUsersFiles] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUrl = location.pathname.split("/");
  const foldername = currentUrl[currentUrl.length - 2];
  const filename = currentUrl[currentUrl.length - 1];

  async function handleGetRequest() {
    const fileContent = await getRequest(
      `${username}/${foldername}/${filename}`,
      "files"
    );
    setFile(fileContent);
  }

  async function handleGetRequestFolder() {
    const files = await getRequest(`${username}/${foldername}`, "files");
    if (files.length > 0) {
      setUsersFiles(files);
    } else {
      setUsersFiles([]);
    }
  }

  async function handleDeleteRequest() {
    const deletedFile = await deleteRequest(
      "files",
      `${username}/${foldername}/${filename}`
    );
    if (deletedFile) {
      console.log("hello");
      handleGetRequestFolder();
      navigate(`/drive/${username}/${foldername}`);
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
