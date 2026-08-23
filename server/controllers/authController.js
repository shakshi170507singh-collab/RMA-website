const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// ADMIN SIGNUP
// =========================

const signup = async (req, res) => {
  try {
    const { name, email, password, adminKey } = req.body;

    // Check required fields
    if (!name || !email || !password || !adminKey) {
      return res.status(400).json({
        message: "Please provide name, email, password and admin key"
      });
    }

    // Check admin key
    if (!process.env.JWT_SECRET) {
      console.error("ADMIN_SECRET_KEY is missing from environment variables");

      return res.status(500).json({
        message: "Server configuration error"
      });
    }

    if (adminKey !== process.env.JWT_SECRET) {
      return res.status(403).json({
        message: "Invalid admin key"
      });
    }

    // Clean email
    const cleanEmail = email.toLowerCase().trim();

    // Check existing user
    const existingUser = await User.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "admin"
    });

    res.status(201).json({
      message: "Admin account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// =========================
// ADMIN LOGIN
// =========================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password"
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Admin only
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin account required."
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from environment variables");

      return res.status(500).json({
        message: "Server configuration error"
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  signup,
  login
};