import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  // ✅ Countdown Timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Send OTP
  const handleSendOtp = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.mobile === mobile && u.role === role
    );

    if (!existingUser) {
      alert("No account found with this mobile number.");
      return;
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedOtp(randomOtp);
    setTimer(60); // 🔥 Start 60 sec timer
    setOtp("");
    alert("OTP Sent: " + randomOtp);
  };

  // ✅ Verify OTP
  const handleVerifyOtp = () => {
    if (timer === 0) {
      alert("OTP Expired. Please resend OTP.");
      setGeneratedOtp("");
      return;
    }

    if (otp === generatedOtp) {
      setOtpVerified(true);
      alert("OTP Verified Successfully");
    } else {
      alert("Invalid OTP");
    }
  };

  // ✅ Reset Password
  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.mobile === mobile && u.role === role
        ? { ...u, password: newPassword }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password Reset Successful");
    navigate(`/login/${role}`);
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

            {/* ✅ Send OTP Button */}
            <button onClick={handleSendOtp} disabled={timer > 0}>
              {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
            </button>

            {/* ✅ Show OTP Section Only After Sending */}
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

                {/* ✅ Countdown Display */}
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