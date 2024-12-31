"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">MyApp</div>
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-green-400">
            Home
          </a>
          <a href="#about" className="hover:text-green-400">
            About
          </a>
          <a href="#services" className="hover:text-green-400">
            Services
          </a>
          <a href="#contact" className="hover:text-green-400">
            Contact
          </a>
        </div>
        <button
          onClick={toggleMenu}
          className="block md:hidden focus:outline-none"
        >
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white"></div>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-700 px-4 py-2">
          <a href="#home" className="block py-2 hover:text-green-400">
            Home
          </a>
          <a href="#about" className="block py-2 hover:text-green-400">
            About
          </a>
          <a href="#services" className="block py-2 hover:text-green-400">
            Services
          </a>
          <a href="#contact" className="block py-2 hover:text-green-400">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
