import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import FavoriteBtn from "../components/FavoriteBtn";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";

// Type elements for each type of pokemon and their weaknesses and strengths
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
  bug: {
    weak: ["fire", "flying", "rock"],
    strong: ["grass", "psychic", "dark"],
  },
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

// Colors for each type
const typeColors = {
  grass: "bg-green-600",
  fire: "bg-red-600",
  water: "bg-blue-600",
  electric: "bg-yellow-500",
  psychic: "bg-purple-600",
  ice: "bg-cyan-500",
  fighting: "bg-orange-600",
  poison: "bg-purple-700",
  ground: "bg-yellow-700",
  flying: "bg-indigo-500",
  bug: "bg-lime-600",
  rock: "bg-gray-600",
  ghost: "bg-violet-600",
  dragon: "bg-indigo-700",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-500",
  normal: "bg-gray-500",
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

  // Get type advantages
  const getTypeAdvantages = (types = []) => {
    const weaknesses = [];
    const strengths = [];

    // Get all types of the pokemon
    const pokemonTypes = types.map((typesObj) => typesObj?.type?.name);

    // loop through each type and get the weaknesses and strengths
    types.forEach((typesObj) => {
      const type = typesObj?.type?.name;
      const typeInfo = typeChart[type];
      if (typeInfo) {
        typeInfo.weak.forEach((weakness) => {
          if (!pokemonTypes.includes(weakness)) {
            weaknesses.push({type: weakness});
          }
        });

        typeInfo.strong.forEach((strength) => {
          if (!pokemonTypes.includes(strength)) {
            strengths.push({type: strength});
          }
        });
      }
    });

    // Combine the effects of dual types
    const finalWeaknesses = weaknesses.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.type === item.type)
    );
    // filter out duplicate strengths so they only appear once
    const finalStrengths = strengths.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.type === item.type)
    );

    return {
      weaknesses: finalWeaknesses,
      strengths: finalStrengths,
    };
  };

  const {weaknesses, strengths} = getTypeAdvantages(pokemon.types);

  // Loading text
  if (loading) return <p className="text-center mt-5">Loading Pokémons...</p>;

  // If names dont match
  if (!pokemon) return <h1 className="text-center mt-5">Pokémon not found</h1>;

  // Next and Previous pokemon buttons functions
  function handleNext() {
    const nextId = id >= 1000 ? 1 : parseInt(id) + 1;
    return router.push(`/pokemon/${nextId}`);
  }

  function handlePrev() {
    const prevId = id <= 1 ? 1000 : parseInt(id) - 1;
    return router.push(`/pokemon/${prevId}`);
  }

  //** Display  of the pokemon details**//
  return (
    <div className="bg-gray-100 px-4 py-4 w-full min-h-screen ">
      {/* BACK LINK*/}
      <div className="flex flex-row items-center mb-5">
        <Link
          href="/"
          className=" flex flex-row items-center gap-2 text-blue-500 hover:underline "
        >
          <FaArrowLeftLong className="text-blue-500" />
          Back
        </Link>
      </div>{" "}
      <h1 className="text-4xl text-center mb-6 font-semibold">
        Pokémon details
      </h1>
      {/*POKEMON SECTION */}
      <div className="flex justify-center">
        <section className="flex flex-col bg-white rounded-lg p-5 m-5 shadow-lg overflow-hidden md:w-[1000px] w-full">
          {/* Next and Previous pokemon buttons */}
          <div className="flex justify-between mb-2">
            {/* {pokemon.id > 1 && ( */}
            <button className="flex gap-1 items-center" onClick={handlePrev}>
              <FaArrowLeftLong className="text-blue-500" />
              <span className="font-semibold hover:opacity-70">
                Previous Pokemon{" "}
                <span className="text-slate-400">
                  {id <= 1 ? `#1000` : `#${pokemon.id - 1}`}
                </span>
              </span>
            </button>

            <button className="flex gap-1 items-center" onClick={handleNext}>
              <span className="font-semibold hover:opacity-70">
                <span className="text-slate-400 ">
                  {id >= 1000 ? `#1` : `#${pokemon.id + 1}`}
                </span>{" "}
                Next Pokemon
              </span>
              <FaArrowRightLong className="text-blue-500" />
            </button>
          </div>
          {/*NAME, ID, FAVORITE BTN */}
          <div className="flex justify-between items-center ">
            <h2 className="text-3xl sm:text-5xl font-semibold">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{" "}
              <span className="text-slate-400">
                {pokemon.id < 10
                  ? `#00${pokemon.id}`
                  : pokemon.id < 100
                  ? `#0${pokemon.id}`
                  : `#${pokemon.id}`}
              </span>
            </h2>
            <FavoriteBtn pokemon={{id: pokemon.id, name: pokemon.name}} />
          </div>
          {/* Image of Pokemons, normal & Shiny */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 p-5 m-4 ">
            <div className="shadow-lg border-8 border-gray-400 rounded-md ">
              <img
                className="bg-blue-300 w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
                src={pokemon.image}
                alt={pokemon.name}
              />
            </div>
            <div className="shadow-lg border-8 border-gray-400 rounded-md ">
              <img
                className="bg-gradient-to-t from-[#22C1C3] to-[#FDBB2D]  w-[200px] h-[200px] md:w-[300px] md:h-[300px] "
                src={pokemon.shinyImage}
                alt={pokemon.name}
              />
            </div>
          </div>
          {/* Display TYPES */}
          <div className="flex flex-col gap-5 ">
            <h2 className="font-bold text-xl">Types:</h2>
            <div className="flex space-x-2">
              <ul className="flex gap-2">
                {(pokemon.types || []).map((typesObj, index) => (
                  <li
                    className={`cursor-default text-white p-4 rounded-md font-semibold text-xs w-16 text center flex justify-center items-center ${
                      typeColors[typesObj.type.name]
                    } capitalize || "bg-gray-500`}
                    key={index}
                  >
                    {typesObj.type.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Display WEIGHT & HEIGHT*/}
            <div className="flex justify-center items-center gap-10 font-sans">
              <div className="flex items-center flex-col bg-gray-100 px-8 sm:px-14 py-3 rounded-lg">
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-bold text-lg">{pokemon.weight / 10} kg</p>
              </div>
              <div className="flex flex-col items-center bg-gray-100 px-8 sm:px-14 py-3  rounded-lg ">
                <p className="text-sm text-gray-600">Height</p>
                <p className="font-bold text-lg text-black">
                  {pokemon.height / 10} m
                </p>
              </div>
            </div>
            {/* Display BASE STATS */}

            <h1 className="font-bold text-xl text-left mb-2 mt-5">
              Base stats:
            </h1>
            {pokemon.stats?.map((statsObj) => (
              <div className="">
                <div className="flex flex-row justify-between w-full ">
                  <p className="font-sans text-sm font-semibold capitalize ml-2">
                    {statsObj.stat.name}
                  </p>
                  <p className="font-sans text-md font-semibold">
                    {statsObj.base_stat}
                  </p>
                </div>
                {/* Progress bar for stats*/}
                <div className="relative w-full h-4 mb-2  rounded-full overflow-hidden bg-gray-200">
                  <div
                    className={`h-full ${
                      statsObj.base_stat < 20
                        ? "bg-red-500 rounded-full"
                        : statsObj.base_stat < 40
                        ? "bg-yellow-500 rounded-full"
                        : statsObj.base_stat < 60
                        ? "bg-orange-500 rounded-full"
                        : "bg-green-500 rounded-full"
                    }`}
                    style={{width: `${Math.min(statsObj.base_stat, 100)}%`}}
                  ></div>
                </div>
              </div>
            ))}

            {/* Display ABILITIES */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Abilities:</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((abilityObj, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-md capitalize "
                  >
                    {abilityObj.ability.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Display weaknesses and strengths */}
            <div className="flex gap-8 justify-center flex-col sm:flex-row  m-2 rounded-md">
              <div className="flex flex-col  sm:border-r-2 pr-8 ">
                <h2 className="text-xl font-semibold mb-4">Weaknesses:</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {weaknesses.length ? (
                    weaknesses.map((weakness, index) => (
                      <li
                        className={`cursor-default text-white p-1 rounded-md font-semibold text-xs w-16 text center flex justify-center items-center capitalize  ${
                          typeColors[weakness.type]
                        } || "bg-gray-500`}
                        key={index}
                      >
                        {weakness.type}
                      </li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Resistances:</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {strengths.length ? (
                    strengths.map((strength, index) => (
                      <li
                        className={`cursor-default text-white p-1 rounded-md font-semibold text-xs w-16 text center flex justify-center items-center capitalize  ${
                          typeColors[strength.type]
                        } || "bg-gray-500`}
                        key={index}
                      >
                        {strength.type}
                      </li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
