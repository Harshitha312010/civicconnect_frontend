import "../../styles/AppTheme.css";

function ComplaintCard({ complaint, updateStatus }) {

  return (
    <div className="glass-card">

      <h3>{complaint.title}</h3>
      <p>{complaint.description}</p>

      <p><strong>Category:</strong> {complaint.category}</p>
      <p><strong>City:</strong> {complaint.city}</p>
      <p><strong>Area:</strong> {complaint.area}</p>
      <p><strong>State:</strong> {complaint.state}</p>
      <p><strong>Location:</strong> {complaint.location}</p>

      {complaint.image && (
        <img
          src={complaint.image}
          alt="complaint"
          className="preview-img"
        />
      )}

      {/* STATUS */}
      <div className="status-container">
        <span
          className={`status-badge ${
            complaint.status === "Pending"
              ? "status-pending"
              : complaint.status === "In Progress"
              ? "status-progress"
              : "status-resolved"
          }`}
        >
          {complaint.status}
        </span>

        <div className="progress-container">
          <div
            className={`progress-bar ${
              complaint.status === "Pending"
                ? "progress-pending"
                : complaint.status === "In Progress"
                ? "progress-progress"
                : "progress-resolved"
            }`}
          ></div>
        </div>
      </div>

      {/* STATUS BUTTONS */}
      <div className="button-group">
        <button
          className="btn"
          onClick={() => updateStatus(complaint.id, "Pending")}
        >
          Pending
        </button>

        <button
          className="btn"
          onClick={() => updateStatus(complaint.id, "In Progress")}
        >
          In Progress
        </button>

        <button
          className="btn"
          onClick={() => updateStatus(complaint.id, "Resolved")}
        >
          Resolved
        </button>
      </div>

    </div>
  );
}

export default ComplaintCard;