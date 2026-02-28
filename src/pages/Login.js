import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Login({ setUser }) {

  const { role } = useParams();
  const navigate = useNavigate();

  const API_URL = "https://civicconnect-backend-5.onrender.com"; 
  // ⬆️ REPLACE this with your real backend Render URL

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Forgot Password UI (kept same, no change)
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password }
      );

      const userData = response.data;

      // Store token
      localStorage.setItem("token", userData.token);

      // Store logged-in user
      localStorage.setItem("loggedInUser", JSON.stringify(userData));

      setUser(userData);

      role === "admin"
        ? navigate("/admin")
        : navigate("/citizen");

    } catch (error) {
      alert("Invalid email or password.");
    }
  };

  // 🔹 Keeping your Forgot Password UI same (still frontend only for now)
  const handleResetPassword = () => {
    alert("Password reset feature needs backend integration.");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>Civic-Connect</h2>
        <h3>{role === "admin" ? "Admin Login" : "Citizen Login"}</h3>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <label>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          <span
            style={{ color: "#1976d2", cursor: "pointer" }}
            onClick={() => navigate(`/forgot-password/${role}`)}
          >
            Forgot Password?
          </span>
        </p>

        {showForgot && (
          <div style={{ marginTop: "15px" }}>
            <label>Enter Registered Email</label>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />

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

            <button
              style={{ marginTop: "10px" }}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        )}

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to={`/signup/${role}`} style={{ color: "#1976d2" }}>
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;