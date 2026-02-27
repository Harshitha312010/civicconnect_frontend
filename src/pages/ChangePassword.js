import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ChangePassword({ user }) {

  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const API_URL = "https://civicconnect-backend-2.onrender.com";

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/users/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Password Updated Successfully");
      navigate("/profile");

    } catch (error) {
      alert("Current password is incorrect");
    }
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