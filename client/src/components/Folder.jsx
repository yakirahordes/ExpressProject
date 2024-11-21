import React from "react";
import { getRequest } from "../functions/getRequest";
import File from "./File";
import { useState } from "react";

export default function Folder({ foldername, username }) {
  const [usersFiles, setUsersFiles] = useState([]);

  async function handleGetRequst() {
    const files = await getRequest(`${username}/${foldername}`, "files");
    if (files.length > 0) {
      setUsersFiles(files);
    } else {
      setUsersFiles([]);
    }
  }

  const handleDelete = (deletedFilename) => {
    handleGetRequst();
  };

  return (
    <div className="folder-card">
      <span>{foldername}</span>
      <button onClick={handleGetRequest}>Show Files</button>
      <div className="file-list">
        {usersFiles.map((file, index) => (
          <File
            key={index}
            filename={file}
            foldername={foldername}
            username={username}
          />
        ))}
      </div>
    </div>
  );
}
