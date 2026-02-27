import { useState } from "react";
import "D:/MERN Project/project/src/styles/Theme.css";

function AdminDashboard({ complaints, setComplaints }) {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [timeSort, setTimeSort] = useState("Latest");

  /* ================= UNIQUE DROPDOWN VALUES ================= */

  const uniqueCities = ["All", ...new Set(complaints.map(c => c.city).filter(Boolean))];
  const uniqueAreas = ["All", ...new Set(complaints.map(c => c.area).filter(Boolean))];
  const uniqueStates = ["All", ...new Set(complaints.map(c => c.state).filter(Boolean))];

  /* ================= FILTER LOGIC ================= */

  const filteredComplaints = complaints.filter(c =>
    (selectedCategory === "All" || c.category === selectedCategory) &&
    (selectedCity === "All" || c.city === selectedCity) &&
    (selectedArea === "All" || c.area === selectedArea) &&
    (selectedState === "All" || c.state === selectedState)
  );

  /* ================= SORT BY TIME ================= */

  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    return timeSort === "Latest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  /* ================= STATUS COUNTS ================= */

  const total = filteredComplaints.length;
  const pending = filteredComplaints.filter(c => c.status === "Pending").length;
  const progress = filteredComplaints.filter(c => c.status === "In Progress").length;
  const resolved = filteredComplaints.filter(c => c.status === "Resolved").length;

  /* ================= UPDATE STATUS ================= */

  const updateStatus = (id, newStatus) => {
    const updated = complaints.map(c =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Admin Dashboard</h2>

      {/* ================= FILTER ROW ================= */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "20px"
        }}
      >
        <div>
          <label>Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Road">Road</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Water">Water</option>
            <option value="Garbage">Garbage</option>
          </select>
        </div>

        <div>
          <label>City</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            {uniqueCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Area</label>
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
            {uniqueAreas.map((area, index) => (
              <option key={index} value={area}>{area}</option>
            ))}
          </select>
        </div>

        <div>
          <label>State</label>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            {uniqueStates.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Time</label>
          <select value={timeSort} onChange={(e) => setTimeSort(e.target.value)}>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* ================= STATUS SUMMARY ================= */}

      <div style={{ marginTop: "10px" }}>
        <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
          <div className="glass-card" style={{ flex: 1, padding: "12px", textAlign: "center" }}>
            <p>Total</p>
            <strong>{total}</strong>
          </div>

          <div className="glass-card" style={{ flex: 1, padding: "12px", textAlign: "center" }}>
            <p>Resolved</p>
            <strong>{resolved}</strong>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div className="glass-card" style={{ flex: 1, padding: "12px", textAlign: "center" }}>
            <p>Pending</p>
            <strong>{pending}</strong>
          </div>

          <div className="glass-card" style={{ flex: 1, padding: "12px", textAlign: "center" }}>
            <p>In Progress</p>
            <strong>{progress}</strong>
          </div>
        </div>
      </div>

      {/* ================= COMPLAINT LIST ================= */}

      <div style={{ marginTop: "25px" }}>
        {sortedComplaints.length === 0 && (
          <p>No complaints match selected filters.</p>
        )}

        {sortedComplaints.map(c => (
          <div key={c.id} className="glass-card" style={{ marginBottom: "20px" }}>

            <h3>{c.title}</h3>
            <p>{c.description}</p>

            {/* ✅ ADDED CATEGORY LINE */}
            <p><strong>Category:</strong> {c.category}</p>

            <p><strong>City:</strong> {c.city}</p>
            <p><strong>Area:</strong> {c.area}</p>
            <p><strong>State:</strong> {c.state}</p>
            <p><strong>Location:</strong> {c.location}</p>
            <p><strong>Status:</strong> {c.status}</p>

            {c.image && (
              <img src={c.image} alt="complaint" className="preview-img" />
            )}

            {/* STATUS BUTTONS */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                gap: "10px"
              }}
            >
              <button
                onClick={() => updateStatus(c.id, "Pending")}
                style={{
                  width: "100px",
                  padding: "6px 0",
                  fontSize: "12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #ef5350, #c62828)",
                  color: "#fff"
                }}
              >
                Pending
              </button>

              <button
                onClick={() => updateStatus(c.id, "In Progress")}
                style={{
                  width: "100px",
                  padding: "6px 0",
                  fontSize: "12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #ffd54f, #f9a825)",
                  color: "#000"
                }}
              >
                In Progress
              </button>

              <button
                onClick={() => updateStatus(c.id, "Resolved")}
                style={{
                  width: "100px",
                  padding: "6px 0",
                  fontSize: "12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #66bb6a, #2e7d32)",
                  color: "#fff"
                }}
              >
                Resolved
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminDashboard;