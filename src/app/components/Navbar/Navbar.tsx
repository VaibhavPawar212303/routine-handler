"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#121212] text-white fixed top-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Clickable Website Logo */}
        <Link href="/" className="text-2xl font-bold text-[#61AFEF] hover:text-[#4FC3F7] transition">
          E2Etst
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 ml-56">
          <Link href="/" className="text-[#61AFEF] hover:text-[#4FC3F7] transition">
            Home
          </Link>
          <Link href="/about" className="text-[#61AFEF] hover:text-[#4FC3F7] transition">
            About
          </Link>
          <Link href="/services" className="text-[#61AFEF] hover:text-[#4FC3F7] transition">
            Services
          </Link>
          <Link href="/contact" className="text-[#61AFEF] hover:text-[#4FC3F7] transition">
            Contact
          </Link>
          <Link href="/routes/blog/allblogs" className="px-4 py-2 bg-[#61AFEF] text-white rounded-md hover:bg-blue-500 transition">
            Blogs
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 bg-[#333333] text-white rounded-md"
          />
          <button className="px-4 py-2 bg-[#61AFEF] text-white rounded-md hover:bg-[#4FC3F7] transition">
            Search
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white"></div>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#333333] px-4 py-2 transition-all duration-300 ease-in-out">
          <Link href="/" className="block py-2 text-[#61AFEF] hover:text-[#4FC3F7]">
            Home
          </Link>
          <Link href="/about" className="block py-2 text-[#61AFEF] hover:text-[#4FC3F7]">
            About
          </Link>
          <Link href="/services" className="block py-2 text-[#61AFEF] hover:text-[#4FC3F7]">
            Services
          </Link>
          <Link href="/contact" className="block py-2 text-[#61AFEF] hover:text-[#4FC3F7]">
            Contact
          </Link>
          <Link href="/routes/blog/allblogs" className="block py-2 text-blue-400 hover:text-blue-300">
            Blogs
          </Link>
        </div>
      )}
    </nav>
  );
}
