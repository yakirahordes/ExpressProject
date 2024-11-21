import React from "react";
import { getRequest } from "../functions/getRequest";
import File from "./File";
import { useState } from "react";
import { postRequest } from "../functions/postRequest";
// import { Link } from "react-router-dom";

export default function Folder({ foldername, username }) {
  const [usersFiles, setUsersFiles] = useState([]);
  const [newFile, setNewFile] = useState("");

  async function handleGetRequest() {
    const files = await getRequest(`${username}/${foldername}`, "files");
    if (files.length > 0) {
      setUsersFiles(files);
    } else {
      setUsersFiles([]);
    }
  }

  // new file
  const addFile = async () => {
    try {
      const added = await postRequest(
        { foldername: foldername, filename: newFile, username: username },
        `files/${username}/${foldername}/${newFile}`
      );
      if (added) {
        setNewFile(""); //input
        handleGetRequest(); //list
      }
    } catch (err) {
      console.error("error is:", err);
    }
  };

  //rename folder
  // rename folder
  // const renameFolder = async () => {
  //   try {
  //     const changed = await postRequest(
  //       {
  //         oldFolderName: foldername,
  //         newFolderName: newFile,
  //         username: username,
  //       },
  //       `files/${username}/${foldername}`
  //     );
  //     if (changed) {
  //       handleGetRequest(); // Refresh folder list
  //       setNewFile(""); // Clear input
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="folder-card">
      <span>{foldername}</span>
      <input
        type="text"
        placeholder="New Folder Name"
        value={newFile}
        onChange={(e) => setNewFile(e.target.value)}
      />
      <button onClick={() => renameFolder()}>Rename Folder</button>
      <button onClick={handleGetRequest}>Show Files</button>
      <div className="file-list">
        {usersFiles.map((file, index) => (
          <File
            key={index}
            filename={file}
            foldername={foldername}
            username={username}
            onDelete={handleGetRequest}
          />
        ))}
      </div>
    </div>
  );
}

//   const renameFolder = async () => {
//     try {
//       const changed = await postRequest(
//         { foldername: foldername, filename: newFile, username: username },
//         `files/${username}/${foldername}`
//       );
//       if (changed) {
//         setNewFile(""); //input
//         handleGetRequest(); //list
//       }
//     } catch (err) {
//       console.error("error is:", err);
//     }
//   };

//   return (
//     <div className="folder-card">
//       <span>{foldername}</span>
//       <input
//         type="text"
//         placeholder="New File"
//         value={newFile}
//         onChange={(e) => setNewFile(e.target.value)}
//       />
//       <button onClick={() => addFile()}>Add File</button>

//       <button onClick={handleGetRequest}>Show Files</button>
//       <div className="file-list">
//         {usersFiles.map((file, index) => (
//           <File
//             key={index}
//             filename={file}
//             foldername={foldername}
//             username={username}
//             onDelete={handleGetRequest}
//           />
//         ))}
//       </div>
//     </div>
//   );}
