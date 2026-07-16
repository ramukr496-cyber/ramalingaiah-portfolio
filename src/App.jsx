import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";

export default function App() {
  const [light, setLight] = useState(
    () => localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    document.body.classList.toggle("light", light);
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>

      <button
        className="theme-toggle"
        onClick={() => setLight((v) => !v)}
        aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      >
        {light ? "◐" : "◑"}
      </button>
    </>
  );
}
