import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/common.css";

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const parentId = localStorage.getItem("parentId");

      try {
        const res = await axios.get(`http://localhost:8081/api/student/by-parent/${parentId}`);
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Parent Dashboard</h2>
      <div className="d-flex gap-3 mb-4 justify-content-center">
        <button className="btn btn-outline-success" onClick={() => navigate("/add-parent")}>Add Parent</button>
        <button className="btn btn-outline-primary" onClick={() => navigate("/add-student")}>Add Student</button>
        <button className="btn btn-warning" onClick={() => navigate("/make-payment")}>Make Payment</button>
      </div>

      <h5 className="text-center mb-3">Student Details</h5>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Name</th><th>Age</th><th>Grade</th><th>DOB</th><th>Gender</th><th>Blood Group</th><th>Address</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.grade}</td>
                <td>{s.dob}</td>
                <td>{s.gender}</td>
                <td>{s.bloodGroup}</td>
                <td>{s.address}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    style={{ width: "150px" }}
                    onClick={() => navigate("/make-payment", { state: { studentId: s.studentId } })}
                  >
                    Make Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
