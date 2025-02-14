/*
- Add a location for where you are in the header underline under the link
- Finish [id].js
- Maybe add a search bar that let's you find pokemon
- Hero component and add it to bookmarks?
*/

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { usePokemon } from "./context/PokemonContext";
import PokemonCard from "./components/PokemonCard";
import LoadMoreButton from "./components/LoadMoreButton";
import Hero from "./components/Hero";
import Search from "./components/Search";

export default function Home() {
  const { searchInput, setSearchInput, pokemons, loading, filteredPokemons } =
    usePokemon();

  const [visible, setVisible] = useState(5);

  // Show loading or error UI if needed
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
  // Error if no data
  if (pokemons.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-red-500">
        <div className="w-32">
          <img
            src="https://media.tenor.com/lc0bFgqDj4gAAAAi/pikachu-triste.gif"
            alt="Sad Pikachu"
            className="animate-bounce"
          />
        </div>
        <p className="mt-4 text-white text-lg font-semibold animate-pulse">
          Failed to load Pokémon data. Please try refreshing.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center my-4 px-4 py-2 border-white border-2 text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <Hero
        title="Welcome to the PokéDex"
        subtitle="Explore the world of Pokémon with our comprehensive Pokédex"
        image="https://media.tenor.com/7guvvXVPhG0AAAAi/pikachu-pokemon.gif"
      >
        <Search
          input={searchInput}
          setInput={setSearchInput}
          width="md:w-[600px]"
        />
      </Hero>

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
          total={filteredPokemons.length}
          onClick={() => setVisible(visible + 5)}
        />
      </div>

      <div className="bg-gray-50">
        <div className="flex flex-col justify-center items-center m-10">
          <h3 className="text-xl text-center font-semibold">
            Pokémon Theme Song
          </h3>
          <iframe
            className="w-full h-96 mt-5 rounded-xl shadow-2xl"
            src="https://www.youtube-nocookie.com/embed/6xKWiCMKKJg"
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
