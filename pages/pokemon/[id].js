import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import FavoriteBtn from "../components/FavoriteBtn";

const typeChart = {
  normal: {weak: ["fighting"], strong: []},
  fire: {
    weak: ["water", "rock", "ground"],
    strong: ["grass", "bug", "ice", "steel"],
  },
  water: {weak: ["electric", "grass"], strong: ["fire", "ground", "rock"]},
  electric: {weak: ["ground"], strong: ["water", "flying"]},
  grass: {
    weak: ["fire", "ice", "poison", "flying", "bug"],
    strong: ["water", "ground", "rock"],
  },
  ice: {
    weak: ["fire", "fighting", "rock", "steel"],
    strong: ["grass", "ground", "flying", "dragon"],
  },
  fighting: {
    weak: ["psychic", "fairy"],
    strong: ["normal", "ice", "rock", "bug", "dark", "steel"],
  },
  poison: {weak: ["ground", "psychic"], strong: ["grass", "fairy"]},
  ground: {
    weak: ["water", "ice", "grass"],
    strong: ["fire", "electric", "poison", "rock", "steel"],
  },
  flying: {
    weak: ["electric", "ice", "rock"],
    strong: ["grass", "fighting", "bug"],
  },
  psychic: {weak: ["bug", "ghost", "dark"], strong: ["fighting", "poison"]},
  bug: {weak: ["fire", "flying", "rock"], strong: ["grass", "psychic", "dark"]},
  rock: {
    weak: ["water", "grass", "fighting", "ground", "steel"],
    strong: ["fire", "ice", "flying", "bug"],
  },
  ghost: {weak: ["ghost", "dark"], strong: ["psychic", "ghost"]},
  dragon: {weak: ["ice", "dragon", "fairy"], strong: ["dragon"]},
  dark: {weak: ["fighting", "fairy", "bug"], strong: ["psychic", "ghost"]},
  steel: {
    weak: ["fire", "fighting", "ground"],
    strong: ["ice", "rock", "fairy"],
  },
  fairy: {weak: ["steel", "poison"], strong: ["dragon", "dark", "fighting"]},
};

export default function PokemonInfoPage() {
  const router = useRouter();
  const {id} = router.query; // Get id from url

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
            types: data.types,
            weight: data.weight,
            height: data.height,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            shinyImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
            stats: data.stats,
          });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setPokemon(null);
        });
    }
  }, [id]);

  console.log("pokemonTypes", pokemon.types);

  const getTypeAdvantages = (types = []) => {
    const typeMultipliers = {};

    // Initialize multipliers
    Object.keys(typeChart).forEach((type) => {
      typeMultipliers[type] = 1; // start with a neutral multiplier (x1)
    });
    if (Array.isArray(types)) {
      types.forEach((typesObj) => {
        const type = typesObj?.type?.name;
        const typeInfo = typeChart[type];
        if (typeInfo) {
          // Apply weaknesses
          typeInfo.weak.forEach((weakness) => {
            typeMultipliers[weakness] *= 2;
          });
          // Apply strengths
          typeInfo.strong.forEach((strength) => {
            typeMultipliers[strength] *= 0.5;
          });
        }
      });
    }

    const weaknesses = [];
    const resistances = [];
    const neutral = [];

    Object.keys(typeMultipliers).forEach((type) => {
      const multiplier = typeMultipliers[type];
      if (multiplier > 1) {
        weaknesses.push(type);
      } else if (multiplier < 1) {
        resistances.push(type);
      } else {
        neutral.push(type);
      }
    });

    return {
      weaknesses,
      resistances,
      neutral,
    };

    // const weaknesses = new Set();
    // const strengths = new Set();
    // if (Array.isArray(types)) {
    //   types.forEach((typesObj) => {
    //     const type = typesObj?.type?.name;
    //     const typeInfo = typeChart[type];
    //     if (typeInfo) {
    //       typeInfo.weak.forEach((weakness) => weaknesses.add(weakness));
    //       typeInfo.strong.forEach((strength) => strengths.add(strength));
    //     }
    //   });
    // }

    // return {
    //   weaknesses: Array.from(weaknesses),
    //   strengths: Array.from(strengths),
    // };
  };

  const {weaknesses, resistances, neutral} = getTypeAdvantages(pokemon.types);

  console.log("pokemonObject", pokemon);

  // Loading text
  if (loading) return <p className="text-center mt-5">Loading Pokémons...</p>;

  // If names dont match
  if (!pokemon) return <h1 className="text-center mt-5">Pokémon not found</h1>;

  return (
    <div className="p-2">
      <Link href="/">
        <span className="text-blue-500 hover:underline mb-4 inline-block">
          Tillbaka till startsidan
        </span>
      </Link>
      <div className="">
        <h1 className="text-xl font-semibold">Pokémon details</h1>
        <FavoriteBtn pokemon={{id: pokemon.id, name: pokemon.name}} />
        <div className="">
          <h2>Name: {pokemon.name}</h2>
          <img src={pokemon.image} alt={pokemon.name} />
          <img src={pokemon.shinyImage} alt={pokemon.name} />
          <h1>Stats:</h1>
          {pokemon.stats.map((statsObj, index) => (
            <div>
              <div>{statsObj.stat.name}</div>
              <div>{statsObj.base_stat}</div>
            </div>
          ))}
          <h2>Abilities:</h2>
          <ul>
            {pokemon.abilities.map((abilityObj, index) => (
              <li key={index}>{abilityObj.ability.name}</li>
            ))}
          </ul>
          <h2>Types:</h2>
          <ul>
            {pokemon.types.map((typesObj, index) => (
              <li key={index}>{typesObj.type.name}</li>
            ))}
          </ul>
          {/* Display weaknesses and strengths */}

          <h2>Weaknesses:</h2>
          <ul>
            {weaknesses.length ? (
              weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul>

          <h2>Resistances:</h2>
          <ul>
            {resistances.length ? (
              resistances.map((resistance, index) => (
                <li key={index}>{resistance}</li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul>

          {/* <h2>Weaknesses:</h2>
          <ul>
            {weaknesses.length ? (
              weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul>
          <h2>Strengths:</h2>
          <ul>
            {strengths.length ? (
              strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul> */}

          <p>Weight: {pokemon.weight}</p>
          <p>height: {pokemon.height}</p>
        </div>
      </div>
    </div>
  );
}
