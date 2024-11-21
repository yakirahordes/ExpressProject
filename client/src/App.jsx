import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DriveLayout from "./pages/DriveLayout";
import Files from "./pages/Files";
import { useState } from "react";
import Folder from "./components/Folder";

function App() {
  const [username, setUsername] = useState();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Login setMainUsername={setUsername} />} />
            <Route
              path="register"
              element={
                <Register username={username} setMainUsername={setUsername} />
              }
            />
            <Route
              path="drive/:username"
              element={
                <DriveLayout username={username} setUsername={setUsername} />
              }
            />
            <Route
              path="drive/:username/:foldername"
              element={<Folder username={username} />}
            />
            <Route
              path="drive/:username/:foldername/:filename"
              element={<File />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
