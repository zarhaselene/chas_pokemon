import Link from "next/link";
import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 mt-auto border-t-4 border-blue-700 text-gray-200 p-2 w-full">
      <div className="flex gap-10 md:justify-evenly">
        {/* Links */}
        <div>
          <h3 className="text-md font-semibold">Links</h3>
          <ul className="text-xs ">
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
        {/* Suport */}
        <div>
          <h3 className="text-md font-semibold">Support</h3>
          <ul className="text-xs">
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
        <div>
          <h3 className="text-lg font-bold mb-4 ">Connect With Us</h3>
          <div className="flex space-x-4 ">
            <a href="" className="text-red-100 hover:text-white ">
              <Facebook size={24} />
            </a>
            <a href="" className="text-red-100 hover:text-white ">
              <Twitter size={24} />
            </a>
            <a href="" className="text-red-100 hover:text-white ">
              <Instagram size={24} />
            </a>
            <a href="" className="text-red-100 hover:text-white ">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-gray-600 mt-2 ">
        <p className=" text-center text-sm mt-2">
          © {new Date().getFullYear()} Pokémon All right reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
