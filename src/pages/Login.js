import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Auth.css";

function Login({ setUser }) {

  const { role } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Added states for Forgot Password
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        u.role === role
    );

    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

      role === "admin"
        ? navigate("/admin")
        : navigate("/citizen");

    } else {
      alert("Invalid credentials for selected portal.");
    }
  };

  // 🔹 Added Forgot Password Function
  const handleResetPassword = () => {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.email === forgotEmail && u.role === role
    );

    if (!existingUser) {
      alert("User not found with this email and role.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const updatedUsers = users.map((u) =>
      u.email === forgotEmail && u.role === role
        ? { ...u, password: newPassword }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password Reset Successful");

    setShowForgot(false);
    setForgotEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>Civic-Connect</h2>
        <h3>{role === "admin" ? "Admin Login" : "Citizen Login"}</h3>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} required />

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