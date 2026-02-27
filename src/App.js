import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminHeatmap from "./pages/admin/AdminHeatmap";
import PortalSelection from "./pages/PortalSelection";
import ReportIssue from "./pages/citizen/ReportIssue";
import TrackComplaints from "./pages/citizen/TrackComplaints";
import MapView from "./pages/citizen/MapView";
import ChangePassword from "./pages/ChangePassword";
function AppLayout() {

  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const location = useLocation();

  /* ================= RESTORE USER SESSION ================= */

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

 
  /* ================= HIDE NAVBAR ================= */

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup");

  return (
    <div className="app-container">

      {!hideNavbar && user && (
        <Navbar user={user} setUser={setUser} />
      )}

      <div className="content-wrapper">

        <Routes>

          {/* Portal Selection */}
          <Route
            path="/"
            element={
              user ? (
                user.role === "admin"
                  ? <Navigate to="/admin" />
                  : <Navigate to="/citizen" />
              ) : (
                <PortalSelection />
              )
            }
          />

          {/* Login */}
          <Route
            path="/login/:role"
            element={<Login setUser={setUser} />}
          />
          <Route path="/forgot-password/:role" element={<ForgotPassword />} />
          {/* Signup */}
          <Route
            path="/signup/:role"
            element={<Signup />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              user ? (
                <Profile user={user} setUser={setUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Citizen Dashboard */}
          <Route
            path="/citizen"
            element={
              user?.role === "citizen"
                ? <CitizenDashboard complaints={complaints} setComplaints={setComplaints} />
                : <Navigate to="/" />
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              user?.role === "admin"
                ? <AdminDashboard complaints={complaints} setComplaints={setComplaints} />
                : <Navigate to="/" />
            }
          />

          {/* Admin Analytics */}
          <Route
            path="/analytics"
            element={
              user?.role === "admin"
                ? <AdminAnalytics complaints={complaints} setComplaints={setComplaints} />
                : <Navigate to="/" />
            }
          />

          {/* Admin Heatmap */}
          <Route
            path="/heatmap"
            element={
              user?.role === "admin"
                ? <AdminHeatmap complaints={complaints} />
                : <Navigate to="/" />
            }
          />

          {/* Report Issue */}
          <Route
            path="/report"
            element={
              user?.role === "citizen"
                ? <ReportIssue complaints={complaints} setComplaints={setComplaints} />
                : <Navigate to="/" />
            }
          />
          <Route
            path="/change-password"
            element={<ChangePassword user={user} />}
          />
          {/* Track Complaints */}
          <Route
            path="/track"
            element={
              user?.role === "citizen"
                ? (
                  <TrackComplaints
                    complaints={complaints}
                    setComplaints={setComplaints}
                  />
                )
                : <Navigate to="/" />
            }
          />

          {/* Map View */}
          <Route
            path="/map"
            element={
              user?.role === "citizen"
                ? <MapView complaints={complaints} />
                : <Navigate to="/" />
            }
          />

        </Routes>

      </div>

      <Footer />

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;