import { useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

function Navbar({ user, setUser }) {

  const [openSidebar, setOpenSidebar] = useState(false);

  const closeSidebar = () => {
    setOpenSidebar(false);
  };

  return (
    <>
      <div className="navbar">

        {/* LEFT */}
        <div className="nav-left">
          <button
            className="menu-btn"
            onClick={() => setOpenSidebar(true)}
          >
            ☰
          </button>
        </div>

        {/* CENTER */}
        <div className="nav-center">
          <h2 className="logo">Civic-Connect</h2>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <NavLink to="/profile">My Profile</NavLink>

          {user?.role === "citizen" && (
            <NavLink to="/citizen">Dashboard</NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin">Admin Dashboard</NavLink>
          )}

          <span
            className="logout-link"
            onClick={() => {
              setUser(null);
              localStorage.removeItem("loggedInUser");
              localStorage.removeItem("token"); // ✅ Added
            }}
          >
            Logout
          </span>
        </div>
      </div>

      {/* Sidebar */}
      {openSidebar && (
        <Sidebar
          role={user?.role}
          closeSidebar={closeSidebar}
        />
      )}
    </>
  );
}

export default Navbar;