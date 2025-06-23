import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/OtpForm.css";

function OtpForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enterPhone");
  const [timer, setTimer] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [resendColor, setResendColor] = useState("green");

  const navigate = useNavigate();

  const startTimer = () => {
    setTimer(45);
    setResendEnabled(false);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleSendOtp = async () => {
    try {
      await axios.post("http://localhost:8081/api/parent/send-otp", { phone });
      setStep("verifyOtp");
      setResendCount(0);
      setResendColor("green");
      startTimer();
      Swal.fire("OTP Sent!", "Please check your phone", "success");
    } catch {
      Swal.fire("Error", "Unable to send OTP", "error");
    }
  };

  const handleResendOtp = async () => {
    if (resendCount >= 3) {
      Swal.fire("Limit Reached", "You can resend OTP max 3 times", "warning");
      return;
    }
    try {
      await axios.post("http://localhost:8081/api/parent/send-otp", { phone });
      setResendCount(resendCount + 1);
      setResendColor("red");
      startTimer();
    } catch {
      Swal.fire("Error", "Could not resend OTP", "error");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:8081/api/parent/verify-otp", { phone, otp });
      if (res.status === 200) {
        localStorage.setItem("verifiedPhone", phone);
        Swal.fire("Verified", "OTP is correct", "success");
        setTimeout(() => navigate("/add-parent"), 1200);
      }
    } catch {
      Swal.fire("Invalid OTP", "Please try again", "error");
    }
  };

  return (
    <div className="otp-wrapper">
      <img src="../assets/logo.png" alt="School Logo" className="school-logo" />
      <h4 className="school-title">Delhi Public School</h4>
      <p className="school-address">
        Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune, Autadwadi Handewadi,<br />Maharashtra 411060
      </p>

      <div className="otp-box shadow">
        {step === "enterPhone" && (
          <>
         <input
  type="tel"
  maxLength="10"
  pattern="[0-9]{10}"
  className="form-control mb-3"
  placeholder="Enter Your Mobile No"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  required
/>


            <button className="btn btn-primary w-100" onClick={handleSendOtp}>
              Generate OTP
            </button>
          </>
        )}

        {step === "verifyOtp" && (
          <>
            <input
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn btn-success w-100 mb-2" onClick={handleVerifyOtp}>
              Validate OTP
            </button>
            {timer > 0 ? (
              <p className="text-center text-muted">Resend OTP in {timer} sec</p>
            ) : (
              <button
                className={`btn w-100 text-white mt-2`}
                style={{ backgroundColor: resendColor }}
                disabled={!resendEnabled}
                onClick={handleResendOtp}
              >
                RESEND OTP ({3 - resendCount} left)
              </button>
            )}
          </>
        )}
      </div>

      <p className="mt-3 text-primary text-decoration-underline text-center" style={{ cursor: "pointer" }}>
        Not Registered
      </p>
    </div>
  );
}

export default OtpForm;
