import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DriveLayout from "./pages/DriveLayout";
import Files from "./pages/Files";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Login username={username} setUsername={setUsername} />}
            />
            <Route path="register" element={<Register />} />
            <Route
              path="drive/:username/"
              element={
                <DriveLayout username={username} setUsername={setUsername} />
              }
            >
              <Route path="files" element={<Files />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
