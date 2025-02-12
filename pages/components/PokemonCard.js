import React from "react";
import Link from "next/link";
import FavoriteBtn from "./FavoriteBtn";

const typeColors = {
  grass: "text-green-600",
  fire: "text-red-600",
  water: "text-blue-600",
  electric: "text-yellow-500",
  psychic: "text-purple-600",
  ice: "text-cyan-500",
  fighting: "text-orange-600",
  poison: "text-purple-700",
  ground: "text-yellow-700",
  flying: "text-indigo-500",
  bug: "text-lime-600",
  rock: "text-gray-600",
  ghost: "text-violet-600",
  dragon: "text-indigo-700",
  dark: "text-gray-700",
  steel: "text-gray-400",
  fairy: "text-pink-500",
  normal: "text-gray-500",
};

export default function PokemonCard({ pokemon }) {
  const id = pokemon.id;
  const types = pokemon.types || [];

  return (
    <div
      key={id}
      className="border-2 w-full h-96 flex flex-col items-center mb-2 rounded-md bg-gray-50 justify-center">
      <Link className="flex flex-col items-center" href={`/pokemon/${id}`}>
        {pokemon.name.toUpperCase()}
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={pokemon.name}
          width={150}
          height={150}
        />
      </Link>
      <p>
        {pokemon.types
          .map((type) => (
            <div className={`${typeColors[type] || "text-black"}`}>
              {" "}
              <span>{type}</span>
            </div>
          ))
          .reduce((prev, curr) => [prev, " ", curr])}
      </p>
      <FavoriteBtn pokemon={{ id, name: pokemon.name }} />
    </div>
  );
}
