import { useEffect, useState } from "react";
import React from "react";
import PokemonCard from "./components/PokemonCard";
import { SiPokemon } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadMoreButton from "./components/LoadMoreButton";

/*
- Mobil anpassa footer
- Add a location for where you are in the header underline under the link
- Finish [id].js
- Make a Search component
- Use Card and Search component in Bookmarks.js
- Make a working hamburger icon that displays a menu
- Maybe add a search bar that let's you find pokemon
*/ 




export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(5);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
        );
        const data = await response.json();

        const pokemonsList = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        }));

        setPokemons(pokemonsList);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
      setLoading(false);
    }

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(input.toLowerCase());
    const idMatch = pokemon.id.toString().includes(input);
    return nameMatch || idMatch;
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-red-500">
        <div className="w-32 h-32 animate-bounce">
          <img
            src="https://media.tenor.com/rbx3ph5SLRUAAAAj/pikachu-pokemon.gif"
            alt="Loading..."
            className="w-32 h-32"
          />
        </div>
        <p className="mt-4 text-white text-lg font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col text-white text-center mb-4 bg-red-500 pb-12 items-center gap-2">
        <div className="flex items-center flex-col justify-center relative">
          <SiPokemon size={200} className="text-center top-4 text-white" />
          <img
            src="https://media.tenor.com/7guvvXVPhG0AAAAi/pikachu-pokemon.gif"
            width="126"
            height="126"
            alt="a pixel art of a pikachu jumping with a lightning bolt coming out of its tail."
            className="max-w-[280px] bg-transparent md:absolute  md:right-[-140px] md:top-[20px]"
          />
        </div>
        <h1 className="font-extrabold tracking-tight sm:text-5xl md:text-6xl text-4xl">
          Welcome to the PokéDex
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl">
          Explore the world of Pokémon with our comprehensive Pokédex
        </p>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mt-3 md:w-[600px]"
        >
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-900 text-xl" />
          <input
            type="text"
            placeholder={`Search by name or ID...`}
            className="block max-w-3xl w-full pl-10 pr-3 text-black py-3 border border-transparent rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </motion.div>
      </div>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {filteredPokemons.slice(0, visible).map((pokemon) => (
            <motion.div
              key={pokemon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PokemonCard pokemon={pokemon} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="text-center mb-5">
        <LoadMoreButton
          visible={visible}
          total={pokemons.length}
          onClick={() => setVisible(visible + 5)}
        />
      </div>
      <div className="bg-gray-50">
        <div className="flex flex-col justify-center items-center m-10">
          <h3 className="text-xl text-center font-semibold">
            Watch This Pokémon Video
          </h3>
          <iframe
            className="w-full h-96 mt-5 rounded-xl shadow-2xl"
            src="https://www.youtube-nocookie.com/embed/JuYeHPFR3f0"
            title="Pokémon Video"
            sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
