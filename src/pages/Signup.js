import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
    role: "citizen",
    password: ""
  });

  const navigate = useNavigate();

  const API_URL = "https://civicconnect-backend-2.onrender.com";
  // 🔴 Replace with your real backend Render URL

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Only send required backend fields
      await axios.post(
        `${API_URL}/api/users/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      alert("Signup Successful!");
      navigate("/");

    } catch (error) {

      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Try again.");
      }

    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="portal-title">Smart Civic-Connect Portal</h2>
        <h3 className="auth-heading">Citizen / Admin Registration</h3>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />

          <label>Email ID</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={handleChange}
            required
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
          />

          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            onChange={handleChange}
            required
          />

          <label>State</label>
          <input
            type="text"
            name="state"
            placeholder="Enter your state"
            onChange={handleChange}
            required
          />

          <label>Pincode</label>
          <input
            type="number"
            name="pincode"
            placeholder="Enter your pincode"
            onChange={handleChange}
            required
          />

          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            placeholder="Enter your mobile number"
            onChange={handleChange}
            required
          />

          <label>Role</label>
          <select name="role" onChange={handleChange}>
            <option value="citizen">Citizen</option>
            <option value="admin">Admin</option>
          </select>

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create strong password"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;