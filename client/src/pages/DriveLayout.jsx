import React, { useState } from "react";
import Folder from "../components/Folder";
import { getRequest } from "../functions/getRequest";
import { postRequest } from "../functions/postRequest";

export default function DriveLayout() {
  const [usersFolders, setUsersFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");

  // folders of user
  const handleGetRequest = async () => {
    try {
      const folders = await getRequest(username);
      setUsersFolders(folders);
    } catch (err) {
      console.log(err);
    }
  };

  // new folder
  const addFolder = async () => {
    try {
      await postRequest({ folderName: newFolder }, "folders");
      setNewFolder(""); //input
      handleGetRequest(); //list
    } catch (err) {
      console.error("error is:", err);
    }
  };

  return (
    <>
      <h2>Drive</h2>
      <button onClick={() => handleGetRequest()}>Show Folders</button>
      <input
        type="text"
        placeholder="new folder"
        value={newFolder}
        onChange={(e) => setNewFolder(e.target.value)}
      />
      <button onClick={() => addFolder()}>Add Folder</button>
      <div>
        {usersFolders.map((folder, index) => (
          <Folder key={index} foldername={folder} />
        ))}
      </div>
    </>
  );
}
