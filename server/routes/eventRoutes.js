
const express = require("express");

const router = express.Router();

const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");


// =========================
// PUBLIC ROUTES
// =========================

// GET all events
// Anyone can view events

router.get("/", getEvents);


// GET one event
// Anyone can view an event

router.get("/:id", getEvent);


// =========================
// ADMIN-ONLY ROUTES
// =========================

// CREATE event
// Requires valid admin JWT

router.post(
  "/",
  authMiddleware,
  createEvent
);


// UPDATE event
// Requires valid admin JWT

router.put(
  "/:id",
  authMiddleware,
  updateEvent
);


// DELETE event
// Requires valid admin JWT

router.delete(
  "/:id",
  authMiddleware,
  deleteEvent
);


module.exports = router;

