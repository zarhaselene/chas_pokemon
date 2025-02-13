import { React, useState, useEffect } from "react";
// import { Menu, Search, User, Heart, ChevronDown } from "lucide-react";
import {
  Heart,
  Search,
  User,
  Menu,
  ChevronDown,
  Circle,
  Swords,
  Bird,
  Flask,
  Mountain,
  Gem,
  Bug as BugIcon,
  Ghost as GhostIcon,
  Cog,
  Flame,
  Droplet,
  Flower2,
  Zap,
  Brain,
  Snowflake,
  Dragon as DragonIcon,
  Moon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [types, setTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => setTypes(data.results))
      .catch((err) => console.error("Failed to fetch types:", err));
  }, []);

  const getTypeColor = (type) => {
    const colors = {
      normal: "#A8A878",
      fighting: "#C03028",
      flying: "#A890F0",
      poison: "#A040A0",
      ground: "#E0C068",
      rock: "#B8A038",
      bug: "#A8B820",
      ghost: "#705898",
      steel: "#B8B8D0",
      fire: "#F08030",
      water: "#6890F0",
      grass: "#78C850",
      electric: "#F8D030",
      psychic: "#F85888",
      ice: "#98D8D8",
      dragon: "#7038F8",
      dark: "#705848",
      fairy: "#EE99AC",
    };
    return colors[type] || "#68A090";
  };
  const getTypeIcon = (type) => {
    const icons = {
      normal: Circle,
      fighting: Swords,
      flying: Bird,
      poison: Flask,
      ground: Mountain,
      rock: Gem,
      bug: BugIcon,
      ghost: GhostIcon,
      steel: Cog,
      fire: Flame,
      water: Droplet,
      grass: Flower2,
      electric: Zap,
      psychic: Brain,
      ice: Snowflake,
      dragon: DragonIcon,
      dark: Moon,
      fairy: Sparkles,
    };
    return icons[type] || Circle;
  };

  return (
    <header className="bg-red-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:text-red-200 transition-colors flex items-center"
                >
                  Pokémon Types
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-10 overflow-hidden border-2 border-red-500"
                    >
                      <div className="grid grid-cols-2 gap-2 p-3">
                        {types.map((type) => {
                          const IconComponent = getTypeIcon(type.name);
                          return (
                            <Link
                              key={type.name}
                              href={`/${type.name}`}
                              passHref
                              legacyBehavior
                            >
                              <a
                                className="relative flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-red-200"
                                onClick={() => setIsOpen(false)}
                              >
                                <div className="relative">
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                                    style={{
                                      backgroundColor: getTypeColor(type.name),
                                      boxShadow: `0 2px 8px ${getTypeColor(
                                        type.name
                                      )}66`,
                                    }}
                                  >
                                    <IconComponent
                                      size={18}
                                      className="text-white"
                                    />
                                  </div>
                                </div>
                                <span className="font-medium text-gray-700 transition-transform duration-200">
                                  {type.name.charAt(0).toUpperCase() +
                                    type.name.slice(1)}
                                </span>
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
