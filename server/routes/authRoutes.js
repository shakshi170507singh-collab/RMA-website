
const express = require("express");

const router = express.Router();

const {
  signup,
  login
} = require("../controllers/authController");

const adminKeyMiddleware = require("../middleware/adminKeyMiddleware");

// =========================
// ADMIN SIGNUP
// POST /api/auth/signup
// Requires private admin key
// =========================

router.post(
  "/signup",
  adminKeyMiddleware,
  signup
);


// =========================
// ADMIN LOGIN
// POST /api/auth/login
// Requires private admin key
// =========================

router.post(
  "/login",
  adminKeyMiddleware,
  login
);


module.exports = router;

