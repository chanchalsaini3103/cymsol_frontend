import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterParent from "./components/RegisterParent";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import MakePayment from "./components/MakePayment";
import ThankYou from "./components/ThankYou";
import OtpForm from "./components/OTPForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OtpForm />} />
        <Route path="/add-parent" element={<RegisterParent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-parent" element={<RegisterParent />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
