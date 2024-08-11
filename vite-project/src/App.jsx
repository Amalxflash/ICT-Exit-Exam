import React, { useState } from "react";
import EmailForm from "./components/EmailForm";
import OtpForm from "./components/OtpForm";
import Welcome from "./components/Welcome";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (email, errorMessage) => {
    if (errorMessage) {
      setError(errorMessage);
    } else {
      try {
        setError("");
        const response = await axios.post("http://localhost:3001/send-otp", {
          email,
        });
        if (response.status === 200) {
          setEmail(email);
          setShowOtpForm(true);
        }
      } catch (error) {
        console.error(
          "Error sending OTP:",
          error.response?.data || error.message
        );
        setError(
          error.response?.data?.message ||
            "Failed to send OTP. Please try again."
        );
      }
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
      setError("");
      const response = await axios.post("http://localhost:3001/verify-otp", {
        email,
        otp,
      });
      if (response.status === 200) {
        setIsVerified(true);
      }
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
      throw error; // Re-throw the error to be caught in the OtpForm component
    }
  };

  return (
    <div>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      {!showOtpForm && !isVerified && (
        <EmailForm onSubmit={handleEmailSubmit} />
      )}
      {showOtpForm && !isVerified && <OtpForm onSubmit={handleOtpSubmit} />}
      {isVerified && <Welcome />}
    </div>
  );
}

export default App;
