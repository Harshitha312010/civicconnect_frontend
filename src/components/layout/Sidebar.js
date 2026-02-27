import { Link } from "react-router-dom";
import "./Layout.css";

function Sidebar({ role, closeSidebar }) {
  return (
    <div className="sidebar-overlay" onClick={closeSidebar}>
      <div
        className="sidebar"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        

        {role === "citizen" && (
          <>

            <Link to="/report" onClick={closeSidebar}>
              <p>Report Issue</p>
            </Link>

            <Link to="/track" onClick={closeSidebar}>
              <p>Track Complaints</p>
            </Link>

            <Link to="/map" onClick={closeSidebar}>
              <p>Map View</p>
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/analytics" onClick={closeSidebar}>
              <p>Analytics</p>
            </Link>

            <Link to="/heatmap" onClick={closeSidebar}>
              <p>Heatmap</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;