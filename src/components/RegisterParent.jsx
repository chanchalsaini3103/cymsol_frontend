import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/auth.css";
function RegisterParent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: localStorage.getItem("verifiedPhone") || "",
    username: "",
    passwordHash: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8081/api/parent/register", form);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/login"), 1600);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again or check your inputs",
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
    <h3 className="form-title">Parent Registration</h3>
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
        placeholder="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        className="form-control mb-3"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="form-control mb-3"
        placeholder="Phone"
        name="phone"
        value={form.phone}
        readOnly
      />
      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        name="passwordHash"
        value={form.passwordHash}
        onChange={handleChange}
      />
      <button className="btn btn-dark w-100" onClick={handleSubmit}>
        Register
      </button>
    </div>
  </div>
);

}

export default RegisterParent;
