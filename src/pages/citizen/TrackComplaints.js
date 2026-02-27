import { useState } from "react";


function TrackComplaints({ complaints, setComplaints }) {

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const deleteComplaint = (id) => {
    const updated = complaints.filter(c => c.id !== id);
    setComplaints(updated);
  };

  const startEdit = (complaint) => {
    setEditingId(complaint.id);
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

  const saveEdit = () => {
    const updated = complaints.map(c =>
      c.id === editingId ? editData : c
    );
    setComplaints(updated);
    setEditingId(null);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Track Complaints</h2>

      {complaints.length === 0 && (
        <p>No complaints raised yet.</p>
      )}

      {complaints.map(c => (
        <div key={c.id} className="glass-card">

          {editingId === c.id ? (
            <>
              {/* ================= EDIT MODE ================= */}

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
                  <option>Streetlight</option>
                  <option>Water</option>
                  <option>Garbage</option>
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
              {/* ================= NORMAL VIEW ================= */}

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
              {/* Progress Bar */}
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
                  <button className="btn btn-danger" onClick={() => deleteComplaint(c.id)} style={{ width: "10%" }}>Delete</button>
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