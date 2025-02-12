import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import Link from "next/link";

export default function PokemonTypePage() {
  const router = useRouter();
  const { type } = router.query; // Get Pokémon type from URL
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Display loading message
  if (loading) return <p className="text-center mt-5">Loading Pokémons...</p>;

  // Show message if no Pokémons with this type exist
  if (!pokemonList.length)
    return <p className="text-center mt-5">No Pokémons found for this type</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">
        {/* Capitalize the first letter */}
        {type.charAt(0).toUpperCase() + type.slice(1)} Pokémon
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-5">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
