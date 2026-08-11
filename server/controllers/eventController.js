const Event = require("../models/Event");

// GET all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      message: "Failed to fetch events"
    });
  }
};


// GET single event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json(event);

  } catch (error) {
    console.error("Get event error:", error);

    res.status(500).json({
      message: "Failed to fetch event"
    });
  }
};


// CREATE event
const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json(event);

  } catch (error) {
    console.error("Create event error:", error);

    res.status(400).json({
      message: "Failed to create event",
      error: error.message
    });
  }
};


// UPDATE event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json(event);

  } catch (error) {
    console.error("Update event error:", error);

    res.status(400).json({
      message: "Failed to update event",
      error: error.message
    });
  }
};


// DELETE event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json({
      message: "Event deleted successfully"
    });

  } catch (error) {
    console.error("Delete event error:", error);

    res.status(500).json({
      message: "Failed to delete event"
    });
  }
};


module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};