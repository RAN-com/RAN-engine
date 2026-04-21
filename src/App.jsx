import React, { useState, useEffect } from "react";

// Section Imports
import Home from "./components/Navbarheading/Home";
import About from "./components/Navbarheading/About";
import Services from "./components/Navbarheading/Assets"; // Check if this should be Services.jsx
import Portfolio from "./components/Navbarheading/Platform";
import Blog from "./components/Navbarheading/Platform"; // Note: You used Platform for both Portfolio & Blog
import Testimonial from "./components/Navbarheading/Testimonial";
import Navbar from "./Components/Hero/Hero";

const roles = ["Developer", "Designer", "YouTuber", "Editor"];

export default function App() {
  const [active, setActive] = useState("Home");
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter Logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting && subIndex === roles[index].length) {
        setTimeout(() => setDeleting(true), 1200);
        return;
      }
      if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
        return;
      }
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setText(roles[index].substring(0, subIndex));
    }, deleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  // Scroll Detection Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "portfolio", "blog", "testimonial"];
      const scrollPos = window.scrollY + 100; // Offset for better triggering

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActive(id.charAt(0).toUpperCase() + id.slice(1));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#071c1f] text-white selection:bg-red-500 selection:text-white">
      {/* Horizontal Sliding Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Sections - Ensure each has an id matching the sections array above */}
      <main>
        <Home typewriterText={text} />
        <About />
        {/* <Services />
        <Portfolio />
        <Blog />
        <Testimonial /> */}
      </main>
    </div>
  );
}