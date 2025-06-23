import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/auth.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8081/api/parent/login", {
        username: form.username,
        passwordHash: form.password,
      });

      localStorage.setItem("parentId", res.data.parentId);
      localStorage.setItem("role", res.data.role);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/dashboard"), 1600);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Please check your username and password",
      });
    }
  };

  return (
    <div className="form-wrapper">
      <img src="../assets/logo.png" alt="School Logo" className="school-logo" />
      <h4 className="school-title">Delhi Public School</h4>
      <p className="school-address">
        Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune, Autadwadi Handewadi,<br />Maharashtra 411060
      </p>

      <h3 className="form-title">Login</h3>
      <div className="form-box shadow-sm p-4 bg-white rounded">
        <input
          className="form-control mb-3"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button className="btn btn-success w-100" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
