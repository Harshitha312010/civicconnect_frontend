import { useState, useEffect } from "react";
import axios from "axios";

function TrackComplaints({ complaints, setComplaints }) {

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const API_URL = "https://civicconnect-backend-5.onrender.com";

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/issues`);
        setComplaints(response.data);
      } catch (error) {
        console.log("Error fetching complaints");
      }
    };

    fetchComplaints();
  }, []);

  // ✅ DELETE FROM BACKEND
  const deleteComplaint = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/issues/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updated = complaints.filter(c => c._id !== id);
      setComplaints(updated);

    } catch (error) {
      alert("Error deleting complaint");
    }
  };

  const startEdit = (complaint) => {
    setEditingId(complaint._id);
    setEditData(complaint);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setEditData({
        ...editData,
        image: URL.createObjectURL(e.target.files[0])
      });
    } else {
      setEditData({
        ...editData,
        [e.target.name]: e.target.value
      });
    }
  };

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

          setEditData(prev => ({
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

  // ✅ UPDATE FROM BACKEND
  const saveEdit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/api/issues/${editingId}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedList = complaints.map(c =>
        c._id === editingId ? response.data : c
      );

      setComplaints(updatedList);
      setEditingId(null);

    } catch (error) {
      alert("Error updating complaint");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Track Complaints</h2>

      {complaints.length === 0 && (
        <p>No complaints raised yet.</p>
      )}

      {complaints.map(c => (
        <div key={c._id} className="glass-card">

          {editingId === c._id ? (
            <>
              <div className="form-group">
                <label>Title</label>
                <input name="title" value={editData.title} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={editData.description} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={editData.category} onChange={handleChange}>
                  <option>Road</option>
                  <option>Garbage</option>
                  <option>Water</option>
                  <option>Electricity</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>City</label>
                <input name="city" value={editData.city} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Area</label>
                <input name="area" value={editData.area} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>State</label>
                <input name="state" value={editData.state} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  name="location"
                  value={editData.location}
                  onChange={handleChange}
                  placeholder="Click button to get current location"
                />

                <button
                  type="button"
                  className="btn"
                  style={{ marginTop: "8px" }}
                  onClick={getCurrentLocation}
                >
                  Use Current Location
                </button>
              </div>

              <div className="form-group">
                <label>Upload Image</label>
                <input type="file" name="image" onChange={handleChange} />
              </div>

              <div className="button-group">
                <button className="btn" onClick={saveEdit} style={{ width: "15%" }}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditingId(null)} style={{ width: "15%" }}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <p><strong>Category:</strong> {c.category}</p>
              <p><strong>City:</strong> {c.city}</p>
              <p><strong>Area:</strong> {c.area}</p>
              <p><strong>State:</strong> {c.state}</p>
              <p><strong>Location:</strong> {c.location}</p>

              {c.image && (
                <img
                  src={c.image}
                  alt="complaint"
                  className="preview-img"
                />
              )}

              <p><strong>Status:</strong> {c.status}</p>

              <div className="progress-container">
                <div
                  className={`progress-bar ${c.status === "Pending"
                      ? "progress-pending"
                      : c.status === "In Progress"
                        ? "progress-progress"
                        : "progress-resolved"
                    }`}
                ></div>
              </div>

              {c.status !== "Resolved" && (
                <div className="button-group">
                  <button className="btn" onClick={() => startEdit(c)} style={{ width: "10%" }}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteComplaint(c._id)} style={{ width: "10%" }}>Delete</button>
                </div>
              )}
            </>
          )}

        </div>
      ))}
    </div>
  );
}

export default TrackComplaints;