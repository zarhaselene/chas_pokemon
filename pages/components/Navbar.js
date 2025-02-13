import {React, useState, useEffect} from "react";
import {Menu, Search, User, Heart, ChevronDown} from "lucide-react";
import Link from "next/link";
import {motion, AnimatePresence} from "framer-motion";

const Header = () => {
  const [types, setTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => setTypes(data.results))
      .catch((err) => console.error("Failed to fetch types:", err));
  }, []);

  return (
    <header className="bg-red-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/">
              <img src="pokeball.png" width="50" height="50" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="text-white hover:text-red-200 transition-colors">
                    Home
                  </a>
                </Link>
              </li>

              <li
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer relative text-white hover:text-red-200 transition-colors flex items-center"
              >
                Pokémon Types{" "}
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
                {/* Dropdown menu */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{opacity: 0, y: -10}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: -10}}
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                      className="absolute top-5 left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10"
                    >
                      {types.map((type) => (
                        <li key={type.name}>
                          <Link
                            href={`/${type.name}`}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {type.name.charAt(0).toUpperCase() +
                              type.name.slice(1)}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-red-200 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-red-200 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link href="/bookmarks" legacyBehavior>
              <a className="text-white hover:text-red-200 transition-colors">
                <Heart size={20} />
              </a>
            </Link>
            <button className="text-white hover:text-red-200 transition-colors">
              <Search size={20} />
            </button>
            <button className="text-white hover:text-red-200 transition-colors">
              <User size={20} />
            </button>
            <button className="md:hidden text-white hover:text-red-200 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
