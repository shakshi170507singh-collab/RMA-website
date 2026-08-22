const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    studentName: {
      type: String,
      required: true,
      trim: true
    },

    registerNumber: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Absent"
    }
  },
  {
    timestamps: true
  }
);

// Prevent the same student from being added twice
// for the same event
attendanceSchema.index(
  {
    event: 1,
    registerNumber: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);