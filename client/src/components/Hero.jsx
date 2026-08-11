import "./Hero.css";
import ramanujan from "../assets/ram.png";

function Hero() {
  return (
    <>
      <section className="hero">

        <div className="hero-content">

          <h1>
            Ramanujan
            <span>Mathematics Association</span>
          </h1>

          <p>
            We are a community of curious minds passionate about Mathematics.
            We encourage curiosity, innovation and excellence in mathematics
            through events, workshops and collaborative learning.
          </p>

          <div className="hero-buttons">

            <a
              href="#events"
              className="primary-btn"
            >
              Explore Events
            </a>

          </div>

        </div>


        <div className="hero-image">

          <div className="glow"></div>

          <img
            src={ramanujan}
            alt="Ramanujan"
          />

        </div>

      </section>


      <section className="stats">

        <div className="card">
          <h2>120+</h2>
          <p>Members</p>
        </div>

        <div className="card">
          <h2>20+</h2>
          <p>Events</p>
        </div>

        <div className="card">
          <h2>15+</h2>
          <p>Workshops</p>
        </div>

        <div className="card">
          <h2>10+</h2>
          <p>Competitions</p>
        </div>

      </section>


      <section className="math-strip">

        <div className="math-track">

          <span>π</span>
          <span>∑</span>
          <span>∫</span>
          <span>√</span>
          <span>∞</span>
          <span>Δ</span>
          <span>θ</span>
          <span>α</span>
          <span>β</span>
          <span>λ</span>
          <span>≈</span>
          <span>≤</span>
          <span>≥</span>
          <span>×</span>
          <span>÷</span>

          {/* duplicate for seamless loop */}

          <span>π</span>
          <span>∑</span>
          <span>∫</span>
          <span>√</span>
          <span>∞</span>
          <span>Δ</span>
          <span>θ</span>
          <span>α</span>
          <span>β</span>
          <span>λ</span>
          <span>≈</span>
          <span>≤</span>
          <span>≥</span>
          <span>×</span>
          <span>÷</span>

        </div>

      </section>
    </>
  );
}

export default Hero;