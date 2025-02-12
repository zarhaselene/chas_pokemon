import { useEffect, useState } from "react";
import React from "react";
import PokemonCard from "./components/PokemonCard";
import Link from "next/link";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(6); // statar med 10 pokemons

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();

        // Hämta data från varje pokemon
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon, index) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            return {
              id: index + 1,
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`,
              types: pokemonData.types.map((t) => t.type.name),
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
      setLoading(false);
    }

    fetchPokemons();
  }, []);

  // Visar Loading om data inte är hämtat
  if (loading) {
    return <div>Loading...</div>;
  }

  const loadMore = () => {
    setVisible((prev) => prev + 6);
  };

  return (
    <div>
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="font-bold text-3xl">Pokémon</h1>
        <p className="text-2xl">PokeDex</p>
      </div>

      {/* Länk till bookmarks-sidan */}
      <div className="text-center my-4">
        <Link href="/bookmarks">
          <span className="inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md text-lg">
            Favorite Pokémons
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-6 place-items-center gap-2">
        {pokemons.slice(0, visible).map((pokemon, index) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
      {/*Load More Button */}
      <div>
        <button
          onClick={loadMore}
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl ml-4 mb-4 duration-150 transition-all ease-in"
        >
          Load more Pokémons
        </button>
      </div>
    </div>
  );
}
// Kanske gör en sökbar och filtrera (+1 på den)
