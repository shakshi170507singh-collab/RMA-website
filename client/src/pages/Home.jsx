import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Events from "../components/Events";
import About from "../components/About";
import Team from "../components/Team";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <div id="events">
        <Events />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="team">
        <Team />
      </div>

      <Footer />
    </>
  );
}

export default Home;