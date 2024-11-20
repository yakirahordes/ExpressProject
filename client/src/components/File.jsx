import React from "react";
import { getRequest } from "../functions/getRequest";

export default function File({ filename, foldername }) {
  const [file, setFile] = useState([]);

  async function handleGetRequest() {
    const fileContent = await getRequest(
      `${username}/${foldername}/${filename}`,
      "files"
    );
    setFile(fileContent);
  }
  return (
    <>
      <div>{filename}</div>
      <button onClick={() => handleGetRequest()}>show file content</button>
      <div>{file}</div>
    </>
  );
}
