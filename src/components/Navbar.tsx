'use client'
import React from "react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen,setIsOpen]=useState(false);
  const links = [
    { href: "/", label: "Home" },
    
  ];
  return (
    <nav className="relative bg-gray-100 p-4 shadow">
      <div className="flex justify-between items-center max-w-6xl mx-auto ">

        <Link href="/" className="font-bold text-lg">
          MySite
        </Link>
        {/* Desktop Link */}
        <div className="hidden md:flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 active:bg-blue-20 transition cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Hamburger on Mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-blue-100"
          aria-expanded={isOpen}
          aria-controls="mobile-menu "
          onClick={()=>setIsOpen((o)=>!o)}
        >
          <span className="sr-only ">Toggle Menu</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden absolute left-0 right-0 top-full bg-white shadow-md z-40">
          <div className="flex flex-col p-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md hover:bg-blue-100 transition"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
