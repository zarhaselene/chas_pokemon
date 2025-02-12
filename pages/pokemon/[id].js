import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";


export default function PokemonInfoPage(){
  const router = useRouter()
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
          height: data.height
         })
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setPokemon(null);
        });
    }
  }, [id]);

  console.log("pokemon", pokemon)

  // Loading text
  if (loading) return <p className="text-center mt-5">Loading Pokémons...</p>;

  // If names dont match
  if (!pokemon.length)
    return <h1 className="text-center mt-5">Pokémon not found</h1>;
  

  return (
    <div>
      <h1>Pokémon details</h1>
      <h2>Name: {pokemon.name}</h2>
    </div>
  )



}