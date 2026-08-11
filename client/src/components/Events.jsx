import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import event1 from "../assets/event1.jpeg";
import event2 from "../assets/event2.jpeg";

import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Images for MVP
  const eventImages = [event1, event2];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/events"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Unable to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="events">
        <div className="events-heading">
          <h2>Events</h2>
          <p>Loading events...</p>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="events">
        <div className="events-heading">
          <h2>Events</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="events" id="events">

      <div className="events-heading">

        <h2>Events</h2>

        <p>
          Explore workshops, competitions, seminars and activities
          organised by Ramanujan Mathematics Association.
        </p>

      </div>


      <div className="event-grid">

        {events.length === 0 ? (

          <div className="empty-events">
            <p>No events available at the moment.</p>
          </div>

        ) : (

          events.map((event, index) => (

            <div
              className="event-card"
              key={event._id}
            >

              {/* EVENT IMAGE */}
              {eventImages[index] && (
                <img
                  src={eventImages[index]}
                  alt={event.title}
                />
              )}


              <div className="event-info">

                <h3>
                  {event.title}
                </h3>


                <p>
                  📅{" "}
                  {new Date(event.date).toLocaleDateString(
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


                <Link
                  to={`/events/${event._id}`}
                  className="event-details-btn"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default Events;