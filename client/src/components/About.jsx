import "./About.css";
import aboutImg from "../assets/about.png";


function About() {
  return (
    <section className="about" id="about">

      <div className="about-image">

        <div className="image-bg"></div>

        <img
          src={aboutImg}
          alt="Mathematics Illustration"
        />

      </div>

      <div className="about-content">

        <p className="section-title">
          ABOUT RMA
        </p>

        <h2>
          Inspiring Curiosity Through Mathematics
        </h2>

        <p className="about-text">
          The Ramanujan Mathematics Association is a vibrant community
          dedicated to nurturing mathematical thinking, innovation and
          collaboration among students. Through workshops, competitions,
          seminars and interactive sessions, we encourage every student
          to explore the beauty of mathematics beyond the classroom.
        </p>

        <div className="features">

          <div>✓ Workshops</div>

          <div>✓ Competitions</div>

          <div>✓ Guest Lectures</div>

          <div>✓ Problem Solving</div>

          <div>✓ Mathematical Research</div>

          <div>✓ Fun Activities</div>

        </div>

        

      </div>

    </section>
  );
}

export default About;