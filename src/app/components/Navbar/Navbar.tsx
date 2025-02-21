"use client";
 
import React, { useState } from "react";
 
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    <nav className="bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Website name */}
        <div className="text-2xl font-bold text-[#61AFEF]">E2Etst</div>
 
        {/* Search bar and button (for mobile and desktop) */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 bg-[#333333] text-white rounded-md"
          />
          <button className="px-4 py-2 bg-[#61AFEF] text-white rounded-md hover:bg-[#4FC3F7] transition-colors">
            Search
          </button>
        </div>
 
        {/* Hamburger menu button for mobile view */}
        <button
          onClick={toggleMenu}
          className="block md:hidden focus:outline-none"
        >
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white"></div>
        </button>
      </div>
 
      {/* Dropdown menu for mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#333333] px-4 py-2">
          <a href="#home" className="block py-2 text-[#61AFEF] hover:text-[#4FC3F7]">
            Home
          </a>
          <a href="#about" className="block py-2 text-[#61AFEF] hover:text-[#4FC3F7]">
            About
          </a>
          <a href="#services" className="block py-2 text-[#61AFEF] hover:text-[#4FC3F7]">
            Services
          </a>
          <a href="#contact" className="block py-2 text-[#61AFEF] hover:text-[#4FC3F7]">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}