import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";
import Navbar from "../Hero/Hero"; // Importing the separate file
import Men from "../../assets/Men.png";

const roles = ["Developer", "Designer", "YouTuber", "Editor", "Film maker"];

export default function App() {
  const [active, setActive] = useState("Home");
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter Effect Logic
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
    }, deleting ? 70 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <div className="min-h-screen bg-[#071c1f] text-white">
      {/* Integrated Separate Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Social Icons */}
      <div className="fixed left-3 md:left-6 bottom-6 md:bottom-10 flex flex-col gap-4 text-lg md:text-xl z-50">
        <a href="https://github.com/RAN-com" target="_blank" rel="noreferrer">
          <FaGithub className="text-red-500 hover:text-white hover:scale-125 transition" />
        </a>
        <a href="https://www.youtube.com/@WebCodingJr" target="_blank" rel="noreferrer">
          <FaYoutube className="text-red-500 hover:text-white hover:scale-125 transition" />
        </a>
        <a href="https://www.instagram.com/ran_game_engine/" target="_blank" rel="noreferrer">
          <FaInstagram className="text-red-500 hover:text-white hover:scale-125 transition" />
        </a>
      </div>

      {/* Main Section */}
      <div className="pt-32 px-4 md:px-10 pb-10">
        <div className="w-full max-w-7xl mx-auto bg-black/90 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-red-400 mb-2 text-sm md:text-base">Hello</p>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                I’m <span className="text-red-500 italic font-light">Ragul</span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-6 min-h-[40px]">
                <span className="text-red-500">{text}</span>
                <span className="animate-pulse ml-1">|</span>
              </h2>
              <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
                I’m Ragul, a passionate video editor, MERN stack developer, and Unity game developer.
                I create engaging visual content and immersive digital experiences.
              </p>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-red-500 hover:bg-red-600 px-8 py-3 rounded-full font-medium transition"
              >
                Download Resume
              </motion.a>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center items-center"
            >
              <img
                src={Men}
                alt="profile"
                className="w-[280px] md:w-[380px] lg:w-[450px] object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}