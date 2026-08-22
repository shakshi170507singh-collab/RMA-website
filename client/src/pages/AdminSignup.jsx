import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function AdminSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "`${import.meta.env.VITE_API_URL}/api/auth/signup`",
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
        setMessage(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      setMessage("Admin account created successfully!");

      setTimeout(() => {
        navigate("/admin/login");
      }, 800);

    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
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
            Create Account
          </h1>

          <p>
            Create an administrator account for RMA.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <div className="auth-switch">

          <p>
            Already have an admin account?
          </p>

          <Link to="/admin/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminSignup;