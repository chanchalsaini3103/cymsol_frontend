import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    grade: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
  });
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async () => {
    const parentId = localStorage.getItem("parentId");

    if (!parentId || parentId === "undefined") {
      setError("Parent ID missing. Please login again.");
      return;
    }

    const studentData = {
      ...form,
      parentId: Number(parentId),
    };

    try {
      await axios.post("http://localhost:8081/api/student/add", studentData, {
        withCredentials: true,
      });
      setSuccess("Student added successfully!");
      navigate("/dashboard")
      setError("");
    } catch (error) {
      console.error("Add student failed:", error);
      setError("Failed to add student");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3">Add Student</h3>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {["name", "age", "grade", "dob", "gender", "bloodGroup", "address"].map((field, i) => (
          <div className="col-md-6 mb-3" key={i}>
            <input
              name={field}
              className="form-control"
              value={form[field]}
              onChange={handleChange}
              placeholder={field === "dob" ? "DOB (YYYY-MM-DD)" : field.charAt(0).toUpperCase() + field.slice(1)}
            />
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleAddStudent}>Add Student</button>
    </div>
  );
};

export default AddStudent;
