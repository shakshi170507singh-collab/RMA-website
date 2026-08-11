const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    venue: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      default: ""
    },

    registrationLink: {
      type: String,
      default: ""
    },

    galleryLink: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["upcoming", "completed"],
      default: "upcoming"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);