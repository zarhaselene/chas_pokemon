import Link from "next/link";
import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 mt-auto border-t-4 border-blue-700 text-gray-200 p-4 w-full">
      <div className="flex flex-wrap justify-between gap-6 md:gap-10 md:justify-evenly text-center md:text-left">
        {/* Links */}
        <div className="w-full md:w-auto">
          <h3 className="text-md font-semibold">Links</h3>
          <ul className="text-sm space-y-1">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Pokémon Types
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Bookmarks
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Latest News
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Community
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="w-full md:w-auto">
          <h3 className="text-md font-semibold">Support</h3>
          <ul className="text-sm space-y-1">
            <li>
              <Link href="/" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="w-full md:w-auto">
          <h3 className="text-md font-semibold">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a
              href="#"
              className="hover:text-red-500 text-white transition-colors duration-300"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="hover:text-red-500 text-white transition-colors duration-300"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="hover:text-red-500 text-white transition-colors duration-300"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="hover:text-red-500 text-white transition-colors duration-300"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 mt-4 pt-2 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Pokémon. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
