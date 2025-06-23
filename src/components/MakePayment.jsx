import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MakePayment.css";

function MakePayment() {
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState([]);
  const parentId = localStorage.getItem("parentId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resParent = await axios.get(`http://localhost:8081/api/parent/by-id/${parentId}`);
        const resStudents = await axios.get(`http://localhost:8081/api/student/by-parent/${parentId}`);
        setParents([resParent.data]);
        setStudents(resStudents.data);
      } catch (error) {
        console.error("Error fetching payment data", error);
      }
    };

    fetchData();
  }, [parentId]);

  const handlePay = () => {
    alert("Payment Successful!");
    navigate("/thank-you");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-warning mb-4">Registration PAYMENT</h2>

      <div className="payment-table mt-4">
        

        {students.map((s, i) => (
          <div className="payment-row selected" key={i}>
            <div className="icon red">✓</div>
            <input type="text" value={s.name} readOnly />
           
            <div className="role-label">Student</div>
          </div>
        ))}
      </div>

      <div className="mt-4 border p-3 w-50 mx-auto text-center shadow rounded bg-light">
        <div className="mb-2">
          <strong>Total Amount (Rs.):</strong> 100.00
        </div>
        <div className="mb-2">
          <strong>Tax Amount (Rs.):</strong> 18.00
        </div>
        <div className="mb-3">
          <strong>Grand Total Amount (Rs.):</strong> 118.00
        </div>
        <button className="btn btn-success" onClick={handlePay}>
          Initiate The PAYMENT
        </button>
      </div>
    </div>
  );
}

export default MakePayment;
