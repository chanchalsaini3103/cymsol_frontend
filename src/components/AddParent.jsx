import React, { useState } from "react";
import axios from "axios";

function AddParent() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", username: "", passwordHash: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8081/api/parent/register", parentData, {
  withCredentials: true,
});

      alert("Parent added successfully");
    } catch {
      alert("Failed to add parent");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add Another Parent</h3>
      {["name", "phone", "email", "username", "passwordHash"].map((field) => (
        <input
          key={field}
          className="form-control mb-2"
          placeholder={field}
          name={field}
          type={field === "passwordHash" ? "password" : "text"}
          value={form[field]}
          onChange={handleChange}
        />
      ))}
      <button className="btn btn-primary" onClick={handleSubmit}>Add Parent</button>
    </div>
  );
}
export default AddParent;
