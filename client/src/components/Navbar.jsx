import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <h2>RMA</h2>
        </Link>
      </div>


      {/* DESKTOP NAVIGATION */}
      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href="/#events">Events</a>
        </li>

        <li>
          <a href="/#about">About</a>
        </li>

        <li>
          <a href="/#team">Team</a>
        </li>

      </ul>


      {/* DESKTOP ADMIN */}
      <Link
        to="/admin"
        className="login-btn"
      >
        Admin Login
      </Link>


      {/* MOBILE HAMBURGER */}
      <button
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>


      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <a href="/#events" onClick={closeMenu}>
          Events
        </a>

        <a href="/#about" onClick={closeMenu}>
          About
        </a>

        <a href="/#team" onClick={closeMenu}>
          Team
        </a>

        <Link
          to="/admin"
          className="mobile-login"
          onClick={closeMenu}
        >
          Admin Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;