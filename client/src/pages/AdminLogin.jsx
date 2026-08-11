import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save JWT token
      localStorage.setItem("adminToken", data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Go to admin dashboard
      navigate("/admin");

    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        "Unable to connect to server. Make sure your backend is running."
      );
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <Link to="/" className="auth-back">
          ← Back to Home
        </Link>

        <div className="auth-header">

          <p className="auth-label">
            RMA ADMIN
          </p>

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to manage events and attendance.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <div className="auth-switch">

          <p>
            Don't have an admin account?
          </p>

          <Link to="/admin/signup">
            Create Admin Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;