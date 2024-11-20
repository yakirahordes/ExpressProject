import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postRequest } from "../functions/postRequest";

export default function Register({ username, setUsername }) {
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const userObj = {
      username: username,
      password: password,
    };
    if (password !== verifyPassword) {
      setError("Verified password does not equal to password");
    } else {
      const currentUser = await postRequest(userObj, "/checkUser");
      if (currentUser) {
        navigate(`/drive/${username}`);
      } else {
        setError("this username exists");
      }
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <label>Username:</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Verify Password:</label>
      <input
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <br />
      <button>Submit</button>
      <br />
      <Link to="/">Login</Link>
      <p>{error}</p>
    </form>
  );
}
