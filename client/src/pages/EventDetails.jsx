import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import event1 from "../assets/event1.jpeg";
import event2 from "../assets/event2.jpeg";

import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [eventIndex, setEventIndex] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const eventImages = [event1, event2];


  useEffect(() => {
    const fetchEvent = async () => {

      try {

        // Fetch the selected event
        const response = await fetch(
          `http://localhost:5000/api/events/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Event not found"
          );
        }

        setEvent(data);


        // Fetch all events to find its position
        const allEventsResponse = await fetch(
          "http://localhost:5000/api/events"
        );

        const allEvents = await allEventsResponse.json();

        const index = allEvents.findIndex(
          (item) => item._id === id
        );

        setEventIndex(index);

      } catch (error) {

        console.error(
          "Error fetching event:",
          error
        );

        setError(error.message);

      } finally {

        setLoading(false);

      }
    };


    fetchEvent();

  }, [id]);


  // Loading
  if (loading) {

    return (
      <section className="event-details">

        <div className="event-details-container">

          <p>Loading event...</p>

        </div>

      </section>
    );

  }


  // Error
  if (error || !event) {

    return (
      <section className="event-details">

        <div className="event-details-container">

          <Link
            to="/"
            className="back-home"
          >
            ← Back to Events
          </Link>


          <h1>
            Event Not Found
          </h1>


          <p>
            {error || "This event does not exist."}
          </p>

        </div>

      </section>
    );

  }


  // Get correct image
  const image =
    eventImages[eventIndex];


  return (
    <section className="event-details">

      <div className="event-details-container">


        {/* BACK BUTTON */}

        <Link
          to="/"
          className="back-home"
        >
          ← Back to Events
        </Link>


        {/* LABEL */}

        <p className="event-label">
          RMA EVENT
        </p>


        {/* TITLE */}

        <h1>
          {event.title}
        </h1>


        {/* DATE + VENUE */}

        <div className="event-meta">

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


        {/* EVENT IMAGE */}

        {image && (

          <img
            src={image}
            alt={event.title}
            className="event-detail-image"
          />

        )}


        {/* DESCRIPTION */}

        <div className="event-description">

          <h2>
            About the Event
          </h2>


          <p>
            {event.description}
          </p>

        </div>


        {/* REGISTRATION */}

        {event.registrationLink && (

          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="registration-btn"
          >
            Register for Event →
          </a>

        )}

      </div>

    </section>
  );
}

export default EventDetails;