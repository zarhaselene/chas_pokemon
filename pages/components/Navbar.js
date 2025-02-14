import { React, useState, useEffect, useContext } from "react";
import {
  Heart,
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
import { RxCrossCircled } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import Search from "./Search.js";
import { usePokemon } from "../context/PokemonContext.js";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [types, setTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTypesOpen, setMobileTypesOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);

  const { searchInput, setSearchInput, searchResults, pokemons, loading } =
    usePokemon();

  const filteredPokemons = pokemons.filter((pokemon) => {
    const nameMatch = pokemon.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const idMatch = pokemon.id.toString().includes(searchInput);
    return nameMatch || idMatch;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobileTypesOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <AnimatePresence>
            <motion.div
              className="flex items-center"
              whileHover={{ y: [0, -9, 0] }}
              transition={{
                duration: 0.9,
                ease: "easeIn",
                repeat: Infinity,
              }}
            >
              <Link href="/">
                <motion.img
                  src="pokeball.png"
                  width="50"
                  height="50"
                  alt="Pokeball"
                />
              </Link>
            </motion.div>
          </AnimatePresence>
          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" legacyBehavior>
                  <a
                    onClick={() => setActivePage("home")}
                    className={`text-white hover:text-red-200 transition-colors ${
                      activePage === "home"
                        ? "underline underline-offset-2 font-semibold"
                        : "text-white"
                    } `}
                  >
                    Home
                  </a>
                </Link>
              </li>
              <div className="relative">
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setActivePage("types");
                  }}
                  className={`text-white hover:text-red-200 transition-colors flex items-center ${
                    activePage === "types"
                      ? "underline underline-offset-2 font-semibold"
                      : "text-white"
                  } `}
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
                  onClick={() => setActivePage("service")}
                  href="#"
                  className={`text-white hover:text-red-200 transition-colors ${
                    activePage === "service"
                      ? "underline underline-offset-2 font-semibold"
                      : "text-white"
                  } `}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  onClick={() => setActivePage("contact")}
                  href="#"
                  className={`text-white hover:text-red-200 transition-colors ${
                    activePage === "contact"
                      ? "underline underline-offset-2 font-semibold"
                      : "text-white"
                  } `}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <AnimatePresence>
              <Link href="/bookmarks" legacyBehavior>
                <motion.a
                  onClick={() => setActivePage("bookMark")}
                  className="inline-block p-2 cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { type: "spring", stiffness: 500, damping: 25 },
                  }}
                >
                  <motion.div
                    initial={{ scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 20,
                      duration: 0.3,
                    }}
                  >
                    <Heart
                      fill={activePage === "bookMark" ? "white" : "transparent"}
                      className={`text-white transition-all duration-300 ${
                        activePage === "b"
                          ? "text-red-500"
                          : "hover:text-red-200"
                      }`}
                    />
                  </motion.div>
                </motion.a>
              </Link>

              <motion.button className="text-white hover:text-red-200 transition-colors relative">
                <FaSearch
                  size={20}
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={` ${
                    searchOpen
                      ? "ml-1 absolute left-2 top-1/2 transform -translate-y-1/2 text-red-700 text-xl "
                      : ""
                  }`}
                />
                <RxCrossCircled
                  onClick={() => {
                    setSearchOpen(false);
                  }}
                  className={` ${
                    searchOpen === true
                      ? "ml-1 absolute right-2 top-1/2 transform -translate-y-1/2 text-red-700 text-xl"
                      : "hidden"
                  }`}
                />

                {searchOpen ? (
                  <div>
                    <input
                      type="text"
                      className="block max-w-3xl w-full pl-10 pr-3 text-black py-3 border-red-700 border-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm"
                    />
                    <div className="absolute bg-white text-black w-56 rounded-xl flex h-56">
                      Bulbasaur
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </motion.button>

              {/* 


  <Search
          input={input}
          setInput={setInput}
          width="w-[300px]"
        />
*/}

              <button className="text-white hover:text-red-200 transition-colors">
                <User size={20} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white hover:text-red-200 transition-colors"
              >
                <Menu size={20} />
              </button>
            </AnimatePresence>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className=" bg-white p-4 mt-2 rounded-xl shadow-lg border-2 border-red-500">
            <ul className="space-y-3 ">
              <li className="p-3 rounded-lg transition-all duration-200 hover:bg-red-200">
                <Link href="/" legacyBehavior>
                  <a
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileTypesOpen(false);
                    }}
                    className="block text-gray-900"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li className="p-3 rounded-lg">
                <button
                  onClick={() => setMobileTypesOpen(!mobileTypesOpen)}
                  className="flex items-center justify-between w-full text-left text-gray-900"
                >
                  Pokémon Types
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-200 ${
                      mobileTypesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Open Types menu */}
                {mobileTypesOpen && (
                  <ul>
                    {types.map((type) => (
                      <li key={type.name}>
                        <Link href={`/${type.name}`} legacyBehavior>
                          <a
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileTypesOpen(false);
                            }}
                            className="block p-3 rounded-lg transition-all duration-200 hover:bg-red-200"
                          >
                            {type.name.charAt(0).toUpperCase() +
                              type.name.slice(1)}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="p-3 cursor-pointer rounded-lg transition-all duration-200 hover:bg-red-200">
                Services
              </li>
              <li className="p-3 cursor-pointer rounded-lg transition-all duration-200 hover:bg-red-200">
                Contact
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
