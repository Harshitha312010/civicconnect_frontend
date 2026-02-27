import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword({ user }) {

  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((u) => u.email === user.email);

    if (existingUser.password !== passwordData.currentPassword) {
      alert("Current password is incorrect");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updatedUsers = users.map((u) =>
      u.email === user.email
        ? { ...u, password: passwordData.newPassword }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password Updated Successfully");
    navigate("/profile");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Change Password</h2>

        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handleChange}
        />

        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleChange}
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handleChange}
        />

        <button onClick={handleUpdate}>
          Update Password
        </button>

      </div>
    </div>
  );
}

export default ChangePassword;