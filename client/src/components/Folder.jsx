import React from "react";
import { redirect } from "react-router-dom";

export default function Folder({ foldername, id }) {
  function handleGetRequst() {
    redirect("/files");
  }
  return (
    <>
      <div>
        <span>{foldername}</span>
        <button onClick={() => handleGetRequst()}>Show files</button>
      </div>
    </>
  );
}
