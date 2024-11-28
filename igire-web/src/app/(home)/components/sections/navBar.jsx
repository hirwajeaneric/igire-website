"use client";

import React, { useState } from "react";
import { navbarData } from "@/fakeDatas/navbarData";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 flex justify-center px-5 py-3 shadow-md font-ibm w-full">
      <div className="flex justify-between items-center w-full md:max-w-screen-xl">
        {/* Logo  */}
        <div className="flex items-center">
          <Image
            src={navbarData.logoSrc}
            width={40}
            height={40}
            alt={navbarData.logoAlt}
            className="w-14 lg:w-16"
          />
          <div className="flex flex-col">
            <h2 className="text-sm">{navbarData.title1}</h2>
            <p className="text-md">{navbarData.title2}</p>
          </div>
        </div>

        {/* Desktop Menu Buttons  */}
        <div className="hidden md:hidden lg:flex justify-center items-center space-x-12 font-bold">
          {navbarData.links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-800 hover:text-orange-700 font-semibold"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Buttons  */}
        <div className="lg:hidden flex items-center gap-8">
          <button className="bg-black text-white px-6 py-3 lg:px-8 lg:py-4 hover:bg-gray-600">
            {navbarData.connectButtonText}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? (
              <MdClose className="h-6 w-6" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Bar  */}
        {isOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-md p-6">
            <div className="flex flex-col space-y-10">
              {navbarData.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-600 font-medium flex justify-between items-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Connect Button  */}
        <Link href={'/contact'} className="bg-black text-white hidden lg:flex px-6 py-3 hover:bg-gray-600">
          {navbarData.connectButtonText}
        </Link>

      </div>
    </nav>
  );
}
