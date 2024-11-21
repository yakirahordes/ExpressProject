import React, { useState } from "react";
import Folder from "../components/Folder";
import { getRequest } from "../functions/getRequest";
import { postRequest } from "../functions/postRequest";

export default function DriveLayout({ username }) {
  const [usersFolders, setUsersFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");

  // folders of user. get, get request,
  const handleGetRequest = async () => {
    try {
      const folders = await getRequest(username, "folders");
      setUsersFolders(folders);
    } catch (err) {
      console.log(err);
    }
  };

  // new folder
  const addFolder = async () => {
    try {
      const added = await postRequest(
        { foldername: newFolder, username: username },
        "folders"
      );
      if (added) {
        setNewFolder(""); //input
        handleGetRequest(); //list
      }
    } catch (err) {
      console.error("error is:", err);
    }
  };

  return (
    <div className="drive-container">
      <h2>Drive</h2>
      <button onClick={() => handleGetRequest()}>Show Folders</button>
      <input
        type="text"
        placeholder="New Folder"
        value={newFolder}
        onChange={(e) => setNewFolder(e.target.value)}
      />
      <button onClick={() => addFolder()}>Add Folder</button>

      <div className="folder-container">
        {usersFolders.map((folder, index) => (
          <Folder
            key={folder + index}
            foldername={folder}
            username={username}
          />
        ))}
      </div>
    </div>
  );
}
