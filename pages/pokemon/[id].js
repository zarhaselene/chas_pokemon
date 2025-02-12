import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PokemonInfoPage() {
  const router = useRouter();
  const { id } = router.query;

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch by id
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then(async (data) => {
          setPokemon({
            id: data.id,
            name: data.name,
            abilities: data.abilities,
            type: data.types,
            weight: data.weight,
            height: data.height,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setPokemon(null);
        });
    }
  }, [id]);

  console.log("pokemonobject", pokemon);

  // Loading text
  if (loading) return <p className="text-center mt-5">Loading Pokémons...</p>;

  // If names dont match
  if (!pokemon) return <h1 className="text-center mt-5">Pokémon not found</h1>;

  return (
    <div>
      <Link href="/">
        <span className="text-blue-500 hover:underline mb-4 inline-block">
          Tillbaka till startsidan
        </span>
      </Link>
      <h1>Pokémon details</h1>
      <h2>Name: {pokemon.name}</h2>
      <h2>Abilities:</h2>
      <ul>
        {pokemon.abilities.map((abilityObj, index) => (
          <li key={index}>{abilityObj.ability.name}</li>
        ))}
      </ul>
      <p>Type: {pokemon.type.map((t) => t.type.name).join(", ")}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>height: {pokemon.height}</p>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  );
}
