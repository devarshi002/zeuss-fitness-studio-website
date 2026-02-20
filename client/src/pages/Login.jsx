import { useState } from "react";
//import axios from "axios";
import API from "../api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    // 🔐 Save JWT token
    localStorage.setItem("token", res.data.token);

    alert("Login Success");
    console.log(res.data);

    // redirect to members
    window.location.href = "/members";
  } catch (error) {
    alert("Login Failed");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🏋️ Gym Management</h2>
        <p className="login-subtitle">Login to your dashboard</p>

        <input
          className="login-input"
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;