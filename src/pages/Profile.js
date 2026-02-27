import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile({ user, setUser }) {

  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(user);

  const API_URL = "https://civicconnect-backend-2.onrender.com";

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({
          ...profileData,
          photo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ BACKEND SAVE
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/api/users/profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(response.data);
      setEditMode(false);

      alert("Profile Updated Successfully");

    } catch (error) {
      alert("Error updating profile");
    }
  };

  // ✅ BACKEND DELETE
  const handleDeleteAccount = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Account Deleted Successfully");
      setUser(null);

    } catch (error) {
      alert("Error deleting account");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-photo-section">
          <img
            src={
              profileData.photo ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
          />

          {editMode && (
            <input type="file" onChange={handlePhotoUpload} />
          )}
        </div>

        <div className="profile-form">

          <label>Full Name</label>
          <input
            name="name"
            value={profileData.name}
            onChange={handleChange}
            disabled={!editMode}
          />

          <label>Email ID</label>
          <input
            name="email"
            value={profileData.email}
            disabled
          />

          <label>City</label>
          <input
            name="city"
            value={profileData.city || ""}
            onChange={handleChange}
            disabled={!editMode}
          />

          <label>State</label>
          <input
            name="state"
            value={profileData.state || ""}
            onChange={handleChange}
            disabled={!editMode}
          />

          <label>Pincode</label>
          <input
            name="pincode"
            value={profileData.pincode || ""}
            onChange={handleChange}
            disabled={!editMode}
          />

          <label>Role</label>
          <input
            value={profileData.role}
            disabled
          />

          <hr />

          <button onClick={() => navigate("/change-password")}>
            Change Password
          </button>

        </div>

        <div className="profile-buttons">

          {!editMode ? (
            <button onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          ) : (
            <button onClick={handleSave}>
              Save Changes
            </button>
          )}

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

          <button className="delete-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>

        </div>
      </div>
    </div>
  );
}

export default Profile;