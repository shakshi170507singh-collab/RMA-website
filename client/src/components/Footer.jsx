import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        {/* About */}
        <div className="footer-col footer-about">

          <h2>RMA</h2>

          <p>
            Ramanujan Mathematics Association is committed to promoting
            mathematical excellence through workshops, competitions,
            seminars and collaborative learning.
          </p>

        </div>


        {/* Quick Links */}
        <div className="footer-col">

          <h3>Quick Links</h3>

          <ul>
  <li>
    <a href="/">Home</a>
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

        </div>


        {/* Contact */}
        <div className="footer-col">

          <h3>Contact</h3>

          <p>📍 Mount Carmel University, Bengaluru</p>

          <p>📧 rma@mccblr.edu.in</p>

          <p>📞 +91 8022286386</p>

        </div>


        {/* Social */}
        <div className="footer-col">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a
              href="https://www.instagram.com/ramanujanassociation.mcu?igsh=cDA1eTd4MHBwNGR2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

          </div>

        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © 2026 Ramanujan Mathematics Association | Mount Carmel University
        </p>

      </div>

    </footer>
  );
}

export default Footer;