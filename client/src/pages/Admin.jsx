
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Attendance from "./Attendance";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  // =========================
  // CREATE EVENT STATE
  // =========================

  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    image: "",
    registrationLink: "",
    galleryLink: "",
    status: "upcoming"
  });

  const [creatingEvent, setCreatingEvent] = useState(false);
  const [eventMessage, setEventMessage] = useState("");


  // =========================
  // FETCH EVENTS
  // =========================

  const fetchEvents = async () => {
    try {
      setEventsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      setEvents(data);
    } catch (error) {
      console.error("Admin events error:", error);
    } finally {
      setEventsLoading(false);
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };


  // =========================
  // HANDLE EVENT FORM
  // =========================

  const handleEventChange = (e) => {
    const { name, value } = e.target;

    setEventForm({
      ...eventForm,
      [name]: value
    });
  };


  // =========================
  // CREATE EVENT
  // =========================

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    setEventMessage("");
    setCreatingEvent(true);

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify(eventForm)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create event"
        );
      }

      setEventMessage("Event created successfully!");

      // Reset form
      setEventForm({
        title: "",
        description: "",
        date: "",
        venue: "",
        image: "",
        registrationLink: "",
        galleryLink: "",
        status: "upcoming"
      });

      // Refresh events
      await fetchEvents();

      // Close form after successful creation
      setTimeout(() => {
        setShowCreateEvent(false);
        setEventMessage("");
      }, 1200);

    } catch (error) {
      console.error("Create event error:", error);

      setEventMessage(
        error.message || "Failed to create event"
      );
    } finally {
      setCreatingEvent(false);
    }
  };


  // =========================
  // RENDER
  // =========================

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

          <button
            className={
              activeSection === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("dashboard")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>


          <button
            className={
              activeSection === "events"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("events")
            }
          >
            <span>◈</span>
            Events
          </button>


          <button
            className={
              activeSection === "notices"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("notices")
            }
          >
            <span>▣</span>
            Notices
          </button>


          <button
            className={
              activeSection === "attendance"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("attendance")
            }
          >
            <span>✓</span>
            Attendance
          </button>

        </nav>


        <div className="sidebar-bottom">

          <button
            className="back-site"
            onClick={() => navigate("/")}
          >
            ← View Website
          </button>


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

        <header className="admin-header">

          <div>

            <p className="admin-label">
              RAMANUJAN MATHEMATICS ASSOCIATION
            </p>

            <h1>

              {activeSection === "dashboard" &&
                "Dashboard"}

              {activeSection === "events" &&
                "Event Management"}

              {activeSection === "notices" &&
                "Notice Management"}

              {activeSection === "attendance" &&
                "Attendance"}

            </h1>

          </div>


          <div className="admin-profile">

            <div className="profile-avatar">
              A
            </div>

            <div>

              <strong>
                Administrator
              </strong>

              <span>
                RMA Admin
              </span>

            </div>

          </div>

        </header>


        {/* =====================================================
            DASHBOARD
        ===================================================== */}

        {activeSection === "dashboard" && (

          <section className="dashboard-content">

            <div className="welcome-card">

              <div>

                <p>
                  WELCOME BACK
                </p>

                <h2>
                  Manage RMA from one place.
                </h2>

                <span>
                  Create events, publish notices and
                  manage association activities.
                </span>

              </div>

              <div className="welcome-symbol">
                ∑
              </div>

            </div>


            {/* STATS */}

            <div className="admin-stats">

              <div className="admin-stat">

                <span>
                  EVENTS
                </span>

                <h2>
                  {eventsLoading
                    ? "--"
                    : String(events.length).padStart(2, "0")}
                </h2>

                <p>
                  Total events
                </p>

              </div>


              <div className="admin-stat">

                <span>
                  NOTICES
                </span>

                <h2>
                  00
                </h2>

                <p>
                  Published notices
                </p>

              </div>


              <div className="admin-stat">

                <span>
                  MEMBERS
                </span>

                <h2>
                  120+
                </h2>

                <p>
                  Association members
                </p>

              </div>


              <div className="admin-stat">

                <span>
                  ATTENDANCE
                </span>

                <h2>
                  --
                </h2>

                <p>
                  Coming soon
                </p>

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="quick-actions">

              <h2>
                Quick Actions
              </h2>


              <div className="action-grid">

                {/* Create Event */}

                <button
                  onClick={() => {
                    setActiveSection("events");
                    setShowCreateEvent(true);
                  }}
                >

                  <span>
                    ＋
                  </span>

                  <div>

                    <strong>
                      Create Event
                    </strong>

                    <p>
                      Add a new RMA event
                    </p>

                  </div>

                </button>


                {/* Publish Notice */}

                <button
                  onClick={() =>
                    setActiveSection("notices")
                  }
                >

                  <span>
                    ✦
                  </span>

                  <div>

                    <strong>
                      Publish Notice
                    </strong>

                    <p>
                      Share an announcement
                    </p>

                  </div>

                </button>


                {/* Attendance */}

                <button
                  onClick={() =>
                    setActiveSection("attendance")
                  }
                >

                  <span>
                    ✓
                  </span>

                  <div>

                    <strong>
                      Attendance
                    </strong>

                    <p>
                      Manage event attendance
                    </p>

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

                <h2>
                  Manage Events
                </h2>

                <p>
                  Create and manage workshops,
                  competitions and other RMA events.
                </p>

              </div>


              <button
                className="primary-admin-btn"
                onClick={() => {
                  setEventMessage("");
                  setShowCreateEvent(true);
                }}
              >
                + Create Event
              </button>

            </div>


            {/* =========================
                CREATE EVENT FORM
            ========================= */}

            {showCreateEvent && (

              <div className="management-card">

                <div className="section-top">

                  <div>

                    <p className="section-mini-title">
                      NEW EVENT
                    </p>

                    <h2>
                      Create Event
                    </h2>

                  </div>

                  <button
                    type="button"
                    className="back-site"
                    onClick={() => {
                      setShowCreateEvent(false);
                      setEventMessage("");
                    }}
                  >
                    Cancel
                  </button>

                </div>


                <form
                  onSubmit={handleCreateEvent}
                  className="event-form"
                >

                  {/* TITLE */}

                  <div className="input-group">

                    <label>
                      Event Title *
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={eventForm.title}
                      onChange={handleEventChange}
                      placeholder="Enter event title"
                      required
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div className="input-group">

                    <label>
                      Description *
                    </label>

                    <textarea
                      name="description"
                      value={eventForm.description}
                      onChange={handleEventChange}
                      placeholder="Describe the event"
                      rows="5"
                      required
                    />

                  </div>


                  {/* DATE */}

                  <div className="input-group">

                    <label>
                      Date *
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={eventForm.date}
                      onChange={handleEventChange}
                      required
                    />

                  </div>


                  {/* VENUE */}

                  <div className="input-group">

                    <label>
                      Venue *
                    </label>

                    <input
                      type="text"
                      name="venue"
                      value={eventForm.venue}
                      onChange={handleEventChange}
                      placeholder="Enter venue"
                      required
                    />

                  </div>


                  {/* IMAGE */}

                  <div className="input-group">

                    <label>
                      Image URL
                    </label>

                    <input
                      type="url"
                      name="image"
                      value={eventForm.image}
                      onChange={handleEventChange}
                      placeholder="https://example.com/image.jpg"
                    />

                  </div>


                  {/* REGISTRATION LINK */}

                  <div className="input-group">

                    <label>
                      Registration Link
                    </label>

                    <input
                      type="url"
                      name="registrationLink"
                      value={eventForm.registrationLink}
                      onChange={handleEventChange}
                      placeholder="https://..."
                    />

                  </div>


                  {/* GALLERY LINK */}

                  <div className="input-group">

                    <label>
                      Gallery Link
                    </label>

                    <input
                      type="url"
                      name="galleryLink"
                      value={eventForm.galleryLink}
                      onChange={handleEventChange}
                      placeholder="https://..."
                    />

                  </div>


                  {/* STATUS */}

                  <div className="input-group">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      value={eventForm.status}
                      onChange={handleEventChange}
                    >

                      <option value="upcoming">
                        Upcoming
                      </option>

                      <option value="completed">
                        Completed
                      </option>

                    </select>

                  </div>


                  {/* MESSAGE */}

                  {eventMessage && (

                    <p className="auth-message">
                      {eventMessage}
                    </p>

                  )}


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="primary-admin-btn"
                    disabled={creatingEvent}
                  >
                    {creatingEvent
                      ? "Creating Event..."
                      : "Create Event"}
                  </button>

                </form>

              </div>

            )}


            {/* =========================
                EVENT LIST
            ========================= */}

            {!showCreateEvent && (

              <div className="management-card">

                {eventsLoading ? (

                  <div className="empty-state">

                    <h3>
                      Loading events...
                    </h3>

                  </div>

                ) : events.length === 0 ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ◈
                    </div>

                    <h3>
                      No events yet
                    </h3>

                    <p>
                      Create your first RMA event.
                    </p>

                    <button
                      className="primary-admin-btn"
                      onClick={() =>
                        setShowCreateEvent(true)
                      }
                    >
                      + Create First Event
                    </button>

                  </div>

                ) : (

                  <div className="admin-event-list">

                    {events.map((event) => (

                      <div
                        className="admin-event-item"
                        key={event._id}
                      >

                        <div>

                          <strong>
                            {event.title}
                          </strong>

                          <p>
                            📅{" "}
                            {new Date(
                              event.date
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                              }
                            )}
                          </p>

                          <p>
                            📍 {event.venue}
                          </p>

                        </div>

                        <span
                          className={
                            event.status === "completed"
                              ? "completed"
                              : "upcoming"
                          }
                        >
                          {event.status}
                        </span>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            )}

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

                <h2>
                  Manage Notices
                </h2>

                <p>
                  Publish important announcements and
                  updates for RMA members.
                </p>

              </div>

              <button
                className="primary-admin-btn"
                onClick={() =>
                  alert(
                    "Notice management will be added next."
                  )
                }
              >
                + Create Notice
              </button>

            </div>


            <div className="management-card">

              <div className="empty-state">

                <div className="empty-icon">
                  ▣
                </div>

                <h3>
                  No notices yet
                </h3>

                <p>
                  Create your first notice to share
                  updates with students and members.
                </p>

                <button
                  className="primary-admin-btn"
                  onClick={() =>
                    alert(
                      "Notice management will be added next."
                    )
                  }
                >
                  + Create Notice
                </button>

              </div>

            </div>

          </section>

        )}


        {/* =====================================================
            ATTENDANCE
        ===================================================== */}

        {activeSection === "attendance" && (
          <Attendance />
        )}

      </main>

    </div>
  );
}

export default Admin;

