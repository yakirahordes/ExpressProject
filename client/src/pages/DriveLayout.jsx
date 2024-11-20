import React, { useState } from "react";
import Folder from "../components/Folder";
import { getRequest } from "../functions/getRequest";

export default function DriveLayout({ username, setUsername }) {
  // const [showButton, setShowButton] = useState(false);
  const [usersFolders, setUsersFolders] = useState([]);

  async function handleGetRequest() {
    const folders = await getRequest(username);
    setUsersFolders(folders);
  }

  return (
    <>
      <div>DriveLayout</div>
      <button onClick={() => handleGetRequest()}>Show Folders</button>

      <div>
        {usersFolders.map((folder, index) => (
          <Folder key={index} foldername={folder} />
        ))}
      </div>
    </>
  );
}
