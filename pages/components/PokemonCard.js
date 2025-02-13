import React from "react";
import Link from "next/link";
import FavoriteBtn from "./FavoriteBtn";
import {AiFillSound} from "react-icons/ai";

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

export default function PokemonCard({pokemon}) {
  const id = pokemon.id;
  const types = pokemon.types || [];

  return (
    <div
      key={id}
      className="border-2 w-full p-8 flex flex-col items-center mb-2 rounded-lg shadow-md bg-white justify-center relative transition-all duration-300 hover:scale-105"
    >
      <div className="absolute top-0 right-1">
        <FavoriteBtn pokemon={{id, name: pokemon.name}} />
      </div>
      <div className="absolute top-2 left-2">
        <AiFillSound />
      </div>

      <Link className="flex flex-col items-center" href={`/pokemon/${id}`}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={pokemon.name}
          width={150}
          height={150}
        />
      </Link>
      <div className="flex flex-col justify-start w-full ml-6">
        <p className="font-semibold"> {pokemon.name.toUpperCase()}</p>
        <p className="text-gray-400 font-semibold font-mono">
          {" "}
          {"#0" + 0 + pokemon.id}{" "}
        </p>
      </div>
      <p className="ml-4 flex w-full justify-start items-start">
        <div className="flex space-x-2 ">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`cursor-default text-white p-[2px] rounded-md font-semibold text-xs w-16 text-center ${
                typeColors[type] || "bg-gray-500"
              }`}
            >
              {type}
            </span>
          ))}
        </div>
      </p>
    </div>
  );
}
