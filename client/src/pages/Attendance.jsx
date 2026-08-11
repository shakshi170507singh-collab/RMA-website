
import { useEffect, useState } from "react";
import "./Attendance.css";

const API = "http://localhost:5000/api";

function Attendance() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [attendance, setAttendance] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [message, setMessage] = useState("");

  // =========================
  // FETCH EVENTS
  // =========================

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true);
        setMessage("");

        const response = await fetch(`${API}/events`);

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        console.log("Events from backend:", data);

        // Handle different possible backend response formats
        let eventList = [];

        if (Array.isArray(data)) {
          eventList = data;
        } else if (Array.isArray(data.events)) {
          eventList = data.events;
        } else if (Array.isArray(data.data)) {
          eventList = data.data;
        }

        setEvents(eventList);

        // Automatically select first event
        if (eventList.length > 0) {
          setSelectedEvent(eventList[0]._id);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setMessage(
          "Unable to load events. Please check your backend."
        );
        setEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // =========================
  // FETCH ATTENDANCE
  // =========================

  useEffect(() => {
    if (!selectedEvent) {
      setAttendance([]);
      return;
    }

    const fetchAttendance = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API}/attendance/event/${selectedEvent}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendance");
        }

        const data = await response.json();

        console.log("Attendance from backend:", data);

        if (Array.isArray(data)) {
          setAttendance(data);
        } else if (Array.isArray(data.attendance)) {
          setAttendance(data.attendance);
        } else if (Array.isArray(data.data)) {
          setAttendance(data.data);
        } else {
          setAttendance([]);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedEvent]);

  // =========================
  // ADD STUDENT
  // =========================

  const handleAddStudent = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!selectedEvent) {
      setMessage("Please select an event first.");
      return;
    }

    if (!studentName.trim()) {
      setMessage("Please enter student name.");
      return;
    }

    if (!registerNumber.trim()) {
      setMessage("Please enter register number.");
      return;
    }

    try {
      const response = await fetch(`${API}/attendance`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          event: selectedEvent,
          studentName: studentName.trim(),
          registerNumber: registerNumber.trim(),
          status: "Absent",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add student"
        );
      }

      setAttendance((prev) => [...prev, data]);

      setStudentName("");
      setRegisterNumber("");

      setMessage("Student added successfully.");
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage(error.message);
    }
  };

  // =========================
  // CHANGE ATTENDANCE STATUS
  // =========================

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(
        `${API}/attendance/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update attendance"
        );
      }

      setAttendance((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status: data.status,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Error updating attendance:",
        error
      );

      setMessage("Unable to update attendance.");
    }
  };

  // =========================
  // DELETE STUDENT
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/attendance/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete attendance"
        );
      }

      setAttendance((prev) =>
        prev.filter((item) => item._id !== id)
      );

      setMessage("Attendance record deleted.");
    } catch (error) {
      console.error(
        "Error deleting attendance:",
        error
      );

      setMessage("Unable to delete attendance.");
    }
  };

  // =========================
  // COUNTS
  // =========================

  const presentCount = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  // =========================
  // GET EVENT NAME
  // =========================

  const getEventName = (event) => {
    return (
      event.title ||
      event.name ||
      event.eventName ||
      event.eventTitle ||
      "Untitled Event"
    );
  };

  // =========================
  // UI
  // =========================

  return (
    <section className="attendance-section">

      {/* =========================
          HEADER
      ========================= */}

      <div className="attendance-header">

        <div>
          <p className="section-mini-title">
            MEMBERS
          </p>

          <h2>
            Attendance Management
          </h2>

          <p>
            Manage student attendance for RMA events.
          </p>
        </div>


        {/* =========================
            EVENT SELECT
        ========================= */}

        <div className="event-selector">

          <label htmlFor="event-select">
            Select Event
          </label>

          <select
            id="event-select"
            value={selectedEvent}
            onChange={(e) =>
              setSelectedEvent(e.target.value)
            }
          >

            <option value="">
              Select an event
            </option>

            {eventsLoading ? (

              <option value="" disabled>
                Loading events...
              </option>

            ) : events.length === 0 ? (

              <option value="" disabled>
                No events available
              </option>

            ) : (

              events.map((event) => (

                <option
                  key={event._id}
                  value={event._id}
                >
                  {getEventName(event)}
                </option>

              ))

            )}

          </select>

        </div>

      </div>


      {/* =========================
          MESSAGE
      ========================= */}

      {message && (
        <p className="attendance-message">
          {message}
        </p>
      )}


      {/* =========================
          STATS
      ========================= */}

      <div className="attendance-stats">

        <div className="attendance-stat">

          <span>
            TOTAL
          </span>

          <strong>
            {attendance.length}
          </strong>

        </div>


        <div className="attendance-stat">

          <span>
            PRESENT
          </span>

          <strong>
            {presentCount}
          </strong>

        </div>


        <div className="attendance-stat">

          <span>
            ABSENT
          </span>

          <strong>
            {absentCount}
          </strong>

        </div>

      </div>


      {/* =========================
          ADD STUDENT
      ========================= */}

      <div className="attendance-add-card">

        <h3>
          Add Student
        </h3>

        <form
          className="attendance-form"
          onSubmit={handleAddStudent}
        >

          <div className="attendance-input">

            <label>
              Register Number
            </label>

            <input
              type="text"
              placeholder="e.g. 23CS101"
              value={registerNumber}
              onChange={(e) =>
                setRegisterNumber(e.target.value)
              }
            />

          </div>


          <div className="attendance-input">

            <label>
              Student Name
            </label>

            <input
              type="text"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) =>
                setStudentName(e.target.value)
              }
            />

          </div>


          <button
            type="submit"
            className="attendance-add-btn"
          >
            + Add Student
          </button>

        </form>

      </div>


      {/* =========================
          ATTENDANCE TABLE
      ========================= */}

      <div className="attendance-table-card">

        <div className="attendance-table-header">

          <div>

            <h3>
              Student Attendance
            </h3>

            <p>
              {selectedEvent
                ? "Mark attendance for this event"
                : "Select an event first"}
            </p>

          </div>

        </div>


        {loading ? (

          <div className="attendance-empty">
            Loading attendance...
          </div>

        ) : attendance.length === 0 ? (

          <div className="attendance-empty">

            <div className="attendance-empty-icon">
              ✓
            </div>

            <h3>
              No students added
            </h3>

            <p>
              Add students above to start managing
              attendance.
            </p>

          </div>

        ) : (

          <div className="attendance-table-wrapper">

            <table className="attendance-table">

              <thead>

                <tr>

                  <th>
                    #
                  </th>

                  <th>
                    Register Number
                  </th>

                  <th>
                    Student Name
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {attendance.map(
                  (student, index) => (

                    <tr
                      key={student._id}
                    >

                      <td>
                        {index + 1}
                      </td>


                      <td>

                        <strong>
                          {student.registerNumber}
                        </strong>

                      </td>


                      <td>
                        {student.studentName}
                      </td>


                      <td>

                        <select
                          className={
                            student.status ===
                            "Present"
                              ? "status-present"
                              : "status-absent"
                          }

                          value={
                            student.status
                          }

                          onChange={(e) =>
                            handleStatusChange(
                              student._id,
                              e.target.value
                            )
                          }
                        >

                          <option value="Present">
                            Present
                          </option>

                          <option value="Absent">
                            Absent
                          </option>

                        </select>

                      </td>


                      <td>

                        <button
                          type="button"
                          className="attendance-delete-btn"

                          onClick={() =>
                            handleDelete(
                              student._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </section>
  );
}

export default Attendance;
