import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDribbble, FaBehance, FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";
import Men  from './assets/Men.png'


const navItems = ["Home", "About", "Services", "Portfolio", "Blog", "Testimonial"];
const roles = ["Developer", "Designer", "YouTuber", "Editor", "Film maker"];

export default function App() {
  const [active, setActive] = useState("Home");
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting && subIndex === roles[index].length) {
        setTimeout(() => setDeleting(true), 800);
        return;
      }

      if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
        return;
      }

      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setText(roles[index].substring(0, subIndex));
    }, deleting ? 120 : 220);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <div className="h-screen overflow-hidden bg-[#071c1f] text-white">

      {/* Navbar */}
      <div className="w-full px-10 py-4 flex justify-between items-center bg-black/80 backdrop-blur-md fixed top-0 left-0 z-50">
        <h1 className="text-xl font-light tracking-widest">RAN Developers</h1>

        <nav className="flex gap-8 text-sm relative">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`relative pb-1 transition ${
                active === item ? "text-red-500" : "hover:text-red-400"
              }`}
            >
              {item}
              {active === item && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-[2px] w-full bg-red-500"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Social Icons */}
      <div className="fixed left-6 bottom-10 flex flex-col gap-4 text-xl z-50">
  
  <a href="https://dribbble.com/yourusername" target="_blank" rel="noopener noreferrer">
    <FaDribbble className="text-red-500 hover:text-white hover:scale-125 transition duration-300 cursor-pointer" />
  </a>

  

  <a href="https://github.com/RAN-com" target="_blank" rel="noopener noreferrer">
    <FaGithub className="text-red-500 hover:text-white hover:scale-125 transition duration-300 cursor-pointer" />
  </a>

  <a href="https://www.youtube.com/@WebCodingJr" target="_blank" rel="noopener noreferrer">
    <FaYoutube className="text-red-500 hover:text-white hover:scale-125 transition duration-300 cursor-pointer" />
  </a>

  <a href="https://www.instagram.com/ran_game_engine/" target="_blank" rel="noopener noreferrer">
    <FaInstagram className="text-red-500 hover:text-white hover:scale-125 transition duration-300 cursor-pointer" />
  </a>

</div>

      {/* Main */}
      <div className="h-[calc(100vh-80px)] flex items-center justify-center pt-20 px-6">
        <div className="w-full max-w-7xl bg-black/90 rounded-3xl p-10 shadow-2xl h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-10 items-center w-full">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-red-400 mb-2">Hello</p>

              <h1 className="text-5xl font-bold mb-2">
                I’m <span className="text-red-500 italic font-light">Ragul</span>
              </h1>

              <h2 className="text-4xl font-semibold mb-6">
                <span className="text-red-500">{text}</span>
                <span className="animate-pulse">|</span>
              </h2>

              <p className="text-gray-400 mb-8 max-w-md">
                I’m Ragul, a passionate video editor, MERN stack developer, and Unity game developer.
I create engaging visual content with modern editing techniques and storytelling.
I build full-stack web applications using MongoDB, Express, React, and Node.js.
I develop interactive games in Unity with smooth mechanics and immersive design.
I enjoy combining creativity and technology to deliver impactful digital experiences.
              </p>

              <motion.button
              
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full shadow-lg transition"
              >
                Resume
              </motion.button>
            </motion.div>

            {/* Right Image Fit */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center items-center h-full"
            >
              <img
                src={Men}
                alt="profile"
                className="max-h-[70vh] w-auto object-contain"
              />

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ delay: 0.3 }}
                className="absolute top-10 right-0 bg-gray-800 px-4 py-2 rounded-lg text-sm"
              >
                UIUX Designer
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-20 left-0 bg-gray-800 px-4 py-2 rounded-lg text-sm"
              >
                Mern Developer
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-0 right-10 bg-gray-800 px-4 py-2 rounded-lg text-sm"
              >
                Film Maker
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}