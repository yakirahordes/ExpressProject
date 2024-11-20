import React from "react";
import { redirect } from "react-router-dom";
import { getRequest } from "../functions/getRequest";
import File from "./File";
import { useState } from "react";

export default function Folder({ foldername, id, username }) {
  const [usersFiles, setUsersFiles] = useState([]);

  async function handleGetRequst() {
    const files = await getRequest("files", `${username}/${foldername}`);
    if (files.length > 0) {
      setUsersFiles(files);
    } else {
      setUsersFiles([""]);
    }
  }
  return (
    <>
      <div>
        <span>{foldername}</span>
        <button onClick={() => handleGetRequst()}>Show files</button>
        <div>
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
    </>
  );
}
