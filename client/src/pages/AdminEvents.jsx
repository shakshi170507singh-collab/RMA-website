import { Link } from "react-router-dom";
import "./AdminEvents.css";

function AdminEvents() {

  return (

    <section className="admin-events">

      <div className="admin-events-container">

        <Link
          to="/admin"
          className="back-link"
        >
          ← Dashboard
        </Link>

        <div className="admin-events-header">

          <div>

            <p>RMA ADMIN</p>

            <h1>
              Manage Events
            </h1>

          </div>

          <button className="add-event-btn">
            + Add Event
          </button>

        </div>


        <div className="events-table">

          <div className="table-header">

            <span>Event</span>
            <span>Date</span>
            <span>Venue</span>
            <span>Status</span>
            <span>Action</span>

          </div>


          <div className="table-row">

            <div>
              <strong>CineMatrix</strong>
            </div>

            <span>
              25 July 2026
            </span>

            <span>
              MOC 201
            </span>

            <span className="completed">
              Completed
            </span>

            <button>
              Edit
            </button>

          </div>


          <div className="table-row">

            <div>
              <strong>Whispers of the Tide</strong>
            </div>

            <span>
              6 August 2026
            </span>

            <span>
              AB101
            </span>

            <span className="upcoming">
              Upcoming
            </span>

            <button>
              Edit
            </button>

          </div>

        </div>

      </div>

    </section>

  );
}

export default AdminEvents;