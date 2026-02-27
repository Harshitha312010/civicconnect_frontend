import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function ForgotPassword() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [timer, setTimer] = useState(0);

  const API_URL = "https://civicconnect-backend-2.onrender.com";

  // ✅ Countdown Timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Send OTP (CONNECTED TO BACKEND)
  const handleSendOtp = async () => {
    try {
      await axios.post(`${API_URL}/api/send-otp`, { mobile });

      setTimer(60);
      setOtp("");
      setGeneratedOtp("sent"); // just to show OTP field

      alert("OTP sent successfully");

    } catch (error) {
      alert("Failed to send OTP");
    }
  };

  // ✅ Verify OTP (CONNECTED TO BACKEND)
  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${API_URL}/api/verify-otp`, {
        mobile,
        otp
      });

      setOtpVerified(true);
      alert("OTP Verified Successfully");

    } catch (error) {
      alert("Invalid or Expired OTP");
    }
  };

  // ✅ Reset Password (CALL BACKEND LOGIN SYSTEM)
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(`${API_URL}/api/users/reset-password`, {
        mobile,
        newPassword,
        role
      });

      alert("Password Reset Successful");
      navigate(`/login/${role}`);

    } catch (error) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <h3>{role === "admin" ? "Admin Portal" : "Citizen Portal"}</h3>

        {!otpVerified ? (
          <>
            <label>Enter Registered Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <button onClick={handleSendOtp} disabled={timer > 0}>
              {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
            </button>

            {generatedOtp && (
              <>
                <label>Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button onClick={handleVerifyOtp}>
                  Verify OTP
                </button>

                {timer > 0 && (
                  <p style={{ color: "red", marginTop: "10px" }}>
                    OTP expires in {timer} seconds
                  </p>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button onClick={handleResetPassword}>
              Update Password
            </button>
          </>
        )}

        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            cursor: "pointer",
            color: "#1976d2",
          }}
          onClick={() => navigate(`/login/${role}`)}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;