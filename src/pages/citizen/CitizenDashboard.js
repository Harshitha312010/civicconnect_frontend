import "D:/MERN Project/project/src/styles/Theme.css"

function CitizenDashboard({ complaints }) {

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="page-container">
      <h2 className="page-title">Citizen Dashboard</h2>

      {/* Stats */}
      <div className="stat-container">

        <div className="glass-card stat-card">
          <h3>Total</h3>
          <div className="stat-number">{total}</div>
        </div>

        <div className="glass-card stat-card">
          <h3>Pending</h3>
          <div className="stat-number">{pending}</div>
        </div>

        <div className="glass-card stat-card">
          <h3>Resolved</h3>
          <div className="stat-number">{resolved}</div>
        </div>

      </div>

      {/* Recent Complaints */}
      <h3 style={{ marginTop: "40px" }}>Recent Complaints</h3>

      {complaints.slice(0, 3).map(c => (
        <div key={c._id} className="glass-card">
          <strong>{c.title}</strong>
          <p>{c.description}</p>

          <span
            className={`status-badge ${c.status === "Pending"
                ? "status-pending"
                : c.status === "In Progress"
                  ? "status-progress"
                  : "status-resolved"
              }`}
          >
            {c.status}
          </span>
        </div>
      ))}

    </div>
  );
}

export default CitizenDashboard;