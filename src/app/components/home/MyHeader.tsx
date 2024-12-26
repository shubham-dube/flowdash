'use client';
import ThemeToggle from "@/lib/toggleTheme"
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';

const MyHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent z-50 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          <div className="items-center flex gap-3 dark:hidden">
          <Image
                src="/logo-blue.png"
                alt="website-name"
                width={40} 
                height={40}
            />
          <Image
                src="/website-name-blue.png"
                alt="website-name"
                width={100} 
                height={16}
                className="mr-2" 
            />
          </div>
          <div className="items-center hidden dark:flex gap-3">
          <Image
                src="/logo-white.png"
                alt="website-name"
                width={40} 
                height={40}
            />
          <Image
                src="/website-name-white.png"
                alt="website-name"
                width={100} 
                height={16}
                className="mr-2" 
            />
          </div>
        </Link>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            Home
          </Link>
          <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 ">
            Features
          </Link>
          <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            Contact
          </Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link href="/signin">
            <button className="px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Sign Up
            </button>
          </Link>
          <ThemeToggle/>
        </div>

        {/* Mobile Menu Icon */}
        <button
          id="menu"
          className="md:hidden text-gray-600 dark:text-gray-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          =
        </button>
      </div>

      {/* Mobile Navbar */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-800">
          <ul className="space-y-4 px-6 py-4">
            <li>
              <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/features" className="text-gray-800 dark:text-gray-200 hover:text-blue-600">
                Features
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-800 dark:text-gray-200 hover:text-blue-600">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/signin" className="block px-4 py-2 text-blue-600 hover:bg-blue-100">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/signup" className="block px-4 py-2 bg-blue-600 text-white rounded">
                Sign Up
              </Link>
            </li>

            <ThemeToggle/>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default MyHeader;
