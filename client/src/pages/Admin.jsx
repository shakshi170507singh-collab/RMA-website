import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Attendance from "./Attendance";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  return (
    <div className="admin-page">
      {/* =========================
          SIDEBAR
      ========================= */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>RMA</h2>
          <span>ADMIN PANEL</span>
        </div>

        <nav className="admin-nav">
          {/* Dashboard */}
          <button
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          {/* Events */}
          <button
            className={activeSection === "events" ? "active" : ""}
            onClick={() => setActiveSection("events")}
          >
            <span>◈</span>
            Events
          </button>

          {/* Notices */}
          <button
            className={activeSection === "notices" ? "active" : ""}
            onClick={() => setActiveSection("notices")}
          >
            <span>▣</span>
            Notices
          </button>

          {/* Attendance */}
          <button
            className={activeSection === "attendance" ? "active" : ""}
            onClick={() => setActiveSection("attendance")}
          >
            <span>✓</span>
            Attendance
          </button>
        </nav>

        <div className="sidebar-bottom">
          {/* View Website */}
          <button
            className="back-site"
            onClick={() => navigate("/")}
          >
            ← View Website
          </button>

          {/* Logout */}
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="admin-main">
        {/* =========================
            TOP BAR
        ========================= */}
        <header className="admin-header">
          <div>
            <p className="admin-label">
              RAMANUJAN MATHEMATICS ASSOCIATION
            </p>

            <h1>
              {activeSection === "dashboard" && "Dashboard"}

              {activeSection === "events" && "Event Management"}

              {activeSection === "notices" && "Notice Management"}

              {activeSection === "attendance" && "Attendance"}
            </h1>
          </div>

          <div className="admin-profile">
            <div className="profile-avatar">A</div>

            <div>
              <strong>Administrator</strong>

              <span>RMA Admin</span>
            </div>
          </div>
        </header>

        {/* =====================================================
            DASHBOARD
        ===================================================== */}
        {activeSection === "dashboard" && (
          <section className="dashboard-content">
            {/* Welcome Card */}
            <div className="welcome-card">
              <div>
                <p>WELCOME BACK</p>

                <h2>Manage RMA from one place.</h2>

                <span>
                  Create events, publish notices and manage
                  association activities.
                </span>
              </div>

              <div className="welcome-symbol">∑</div>
            </div>

            {/* STATS */}
            <div className="admin-stats">
              <div className="admin-stat">
                <span>EVENTS</span>

                <h2>02</h2>

                <p>Total events</p>
              </div>

              <div className="admin-stat">
                <span>NOTICES</span>

                <h2>00</h2>

                <p>Published notices</p>
              </div>

              <div className="admin-stat">
                <span>MEMBERS</span>

                <h2>120+</h2>

                <p>Association members</p>
              </div>

              <div className="admin-stat">
                <span>ATTENDANCE</span>

                <h2>--</h2>

                <p>Coming soon</p>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>

              <div className="action-grid">
                {/* Create Event */}
                <button
                  onClick={() => setActiveSection("events")}
                >
                  <span>＋</span>

                  <div>
                    <strong>Create Event</strong>

                    <p>Add a new RMA event</p>
                  </div>
                </button>

                {/* Publish Notice */}
                <button
                  onClick={() => setActiveSection("notices")}
                >
                  <span>✦</span>

                  <div>
                    <strong>Publish Notice</strong>

                    <p>Share an announcement</p>
                  </div>
                </button>

                {/* Attendance */}
                <button
                  onClick={() => setActiveSection("attendance")}
                >
                  <span>✓</span>

                  <div>
                    <strong>Attendance</strong>

                    <p>Manage event attendance</p>
                  </div>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            EVENTS
        ===================================================== */}
        {activeSection === "events" && (
          <section className="management-section">
            <div className="section-top">
              <div>
                <p className="section-mini-title">
                  CONTENT
                </p>

                <h2>Manage Events</h2>

                <p>
                  Create and manage workshops, competitions
                  and other RMA events.
                </p>
              </div>

              <button className="primary-admin-btn">
                + Create Event
              </button>
            </div>

            <div className="management-card">
              <div className="empty-state">
                <div className="empty-icon">◈</div>

                <h3>Your events will appear here</h3>

                <p>
                  Once connected to MongoDB, you will be able
                  to create, edit and delete events from this
                  panel.
                </p>

                <button className="primary-admin-btn">
                  + Create First Event
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            NOTICES
        ===================================================== */}
        {activeSection === "notices" && (
          <section className="management-section">
            <div className="section-top">
              <div>
                <p className="section-mini-title">
                  ANNOUNCEMENTS
                </p>

                <h2>Manage Notices</h2>

                <p>
                  Publish important announcements and updates
                  for RMA members.
                </p>
              </div>

              <button className="primary-admin-btn">
                + Create Notice
              </button>
            </div>

            <div className="management-card">
              <div className="empty-state">
                <div className="empty-icon">▣</div>

                <h3>No notices yet</h3>

                <p>
                  Create your first notice to share updates
                  with students and members.
                </p>

                <button className="primary-admin-btn">
                  + Create Notice
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            ATTENDANCE
        ===================================================== */}
        {activeSection === "attendance" && <Attendance />}
      </main>
    </div>
  );
}

export default Admin;