import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import LoadMoreButton from "./components/LoadMoreButton";
import typeDescriptions from "../utils/typeDescriptions";
import { motion } from "framer-motion";

export default function PokemonTypePage() {
  const router = useRouter();
  const { type } = router.query; // Get Pokémon type from URL
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(5); // statar med 5 pokemons

  // Fetch Pokémon by type, limit to 20
  useEffect(() => {
    if (type) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((res) => res.json())
        .then(async (data) => {
          if (data.pokemon) {
            // Get additional details
            const detailedPokemon = await Promise.all(
              data.pokemon.slice(0, 20).map(async (pokeData) => {
                const pokemon = pokeData.pokemon;
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonDetails = await pokemonResponse.json();
                return {
                  id: pokemonDetails.id,
                  name: pokemonDetails.name,
                  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`,
                  types: pokemonDetails.types.map((type) => type.type.name),
                };
              })
            );
            setPokemonList(detailedPokemon);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setPokemonList([]); // Reset if error
        });
    }
  }, [type]);

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
  // Show message if no Pokémons with this type exist
  if (!pokemonList.length)
    return <p className="text-center mt-5">No Pokémons found for this type</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mt-8">
        {/* Capitalize the first letter */}
        {type.charAt(0).toUpperCase() + type.slice(1)} Pokémon
      </h1>
      <p className="text-center text-lg mt-2 px-6 max-w-2xl mx-auto">
        {typeDescriptions[type] ||
          "This is a unique Pokémon type with special abilities."}
      </p>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {pokemonList.slice(0, visible).map((pokemon) => (
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
      {/*Load More Button */}
      <div className="text-center mb-5">
        <LoadMoreButton
          visible={visible}
          total={pokemonList.length}
          onClick={() => setVisible(visible + 5)}
        />
      </div>
    </div>
  );
}
