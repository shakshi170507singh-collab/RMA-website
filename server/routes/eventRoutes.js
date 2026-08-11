const express = require("express");

const router = express.Router();

const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");


// GET all events
router.get("/", getEvents);


// GET one event
router.get("/:id", getEvent);


// CREATE event
router.post("/", createEvent);


// UPDATE event
router.put("/:id", updateEvent);


// DELETE event
router.delete("/:id", deleteEvent);


module.exports = router;