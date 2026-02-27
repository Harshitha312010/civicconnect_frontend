import { useState } from "react";
import axios from "axios";

function ReportIssue({ complaints, setComplaints }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Road",
    city: "",
    area: "",
    state: "",
    location: "",
    latitude: "",
    longitude: "",
    image: null
  });

  const API_URL = "https://civicconnect-backend-2.onrender.com";
  // 🔴 Replace with your real backend URL

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: URL.createObjectURL(e.target.files[0])
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  /* ================= CURRENT LOCATION ================= */

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await response.json();

          setFormData(prev => ({
            ...prev,
            location: data.display_name,
            latitude: lat,
            longitude: lon
          }));
        } catch (error) {
          alert("Error fetching address");
        }
      },
      () => alert("Unable to fetch location")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/issues`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const newComplaint = response.data;

      setComplaints([...complaints, newComplaint]);

      alert("Complaint Submitted Successfully!");

      setFormData({
        title: "",
        description: "",
        category: "Road",
        city: "",
        area: "",
        state: "",
        location: "",
        latitude: "",
        longitude: "",
        image: null
      });

    } catch (error) {

      if (error.response && error.response.status === 401) {
        alert("Please login again.");
      } else {
        alert("Error submitting complaint.");
      }

    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Report Issue</h2>

      <form onSubmit={handleSubmit}>

        <label style={{ fontSize: "16px", fontWeight: "400" }}>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label style={{ fontSize: "16px", fontWeight: "400" }}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label style={{ fontSize: "16px", fontWeight: "400" }}>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Road</option>
          <option>Streetlight</option>
          <option>Water</option>
          <option>Garbage</option>
        </select>

        <label style={{ fontSize: "16px", fontWeight: "400" }}>City</label>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <label style={{ fontSize: "16px", fontWeight: "400" }}>Area</label>
        <input
          name="area"
          value={formData.area}
          onChange={handleChange}
        />

        <label style={{ fontSize: "16px", fontWeight: "400" }}>State</label>
        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
        />

        <label style={{ fontSize: "16px", fontWeight: "400" }}>Upload Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />

        <label style={{ fontSize: "16px", fontWeight: "400" }}>Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Click button to get current location"
        />

        <div style={{ marginTop: "4px" }}>

          <div style={{ textAlign: "left", marginBottom: "15px" }}>
            <button
              type="button"
              onClick={getCurrentLocation}
              style={{
                width: "20%",
                background: "rgba(15, 76, 129, 0.75)",
                color: "white",
                padding: "8px 0",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Use Current Location
            </button>
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                width: "30%",
                background: "rgba(15, 76, 129, 0.75)",
                color: "white",
                padding: "8px 0",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Submit Complaint
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}

export default ReportIssue;