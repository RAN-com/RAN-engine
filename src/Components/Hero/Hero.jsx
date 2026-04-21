import React from "react";
import { motion } from "framer-motion";

const navItems = ["Home", "About", "Services", "Portfolio", "Blog", "Testimonial"];

const Navbar = ({ active, setActive }) => {
  return (
    <div className="w-full px-4 md:px-10 py-4 flex justify-between items-center bg-black/80 backdrop-blur-md fixed top-0 left-0 z-50">
      <h1 className="text-lg md:text-xl font-light tracking-widest text-white">
        RAN Developers
      </h1>

      <nav className="hidden md:flex gap-8 text-sm">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`relative pb-1 transition-colors duration-300 ${
              active === item ? "text-red-500" : "text-gray-300 hover:text-red-400"
            }`}
          >
            {item}
            
            {/* Horizontal Moving Underline */}
            {active === item && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 h-[2px] w-full bg-red-500"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;