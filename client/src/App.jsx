import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import About from "./components/About";
import Team from "./components/Team";
import Footer from "./components/Footer";

import EventDetails from "./pages/EventDetails"
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import ProtectedRoute from "./components/ProtectedRoute";


function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Events />
        <About />
        <Team />
      </main>

      <Footer />
    </>
  );
}


function App() {
  return (
    <Routes>

      {/* PUBLIC WEBSITE */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/events/:id"
        element={
          <>
            <Navbar />
            <EventDetails />
          </>
        }
      />


      {/* ADMIN LOGIN */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* ADMIN SIGNUP */}

      <Route
        path="/admin/signup"
        element={<AdminSignup />}
      />


      {/* PROTECTED ADMIN */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;