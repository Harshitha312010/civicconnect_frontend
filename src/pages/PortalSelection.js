import { useNavigate } from "react-router-dom";
import "./Auth.css";

function PortalSelection() {

  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>

        <h2 className="portal-title">Civic-Connect</h2>
        <h3>Select Your Portal</h3>

        <button
          style={{ marginTop: "20px", display: "block", width: "100%" }}
          onClick={() => navigate("/login/citizen")}
        >
          Citizen Portal
        </button>

        <button
          style={{ marginTop: "25px", display: "block", width: "100%" }}
          onClick={() => navigate("/login/admin")}
        >
          Admin Portal
        </button>

      </div>
    </div>
  );
}

export default PortalSelection;