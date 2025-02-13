import React, {useEffect, useState} from "react";
import {useFavorites} from "./context/FavoritesContext";
import Link from "next/link";

const typeColors = {
  grass: {text: "text-white", bg: "bg-green-700"},
  fire: {text: "text-white", bg: "bg-red-700"},
  water: {text: "text-white", bg: "bg-blue-700"},
  electric: {text: "text-white", bg: "bg-yellow-600"},
  psychic: {text: "text-white", bg: "bg-purple-700"},
  ice: {text: "text-white", bg: "bg-cyan-600"},
  fighting: {text: "text-white", bg: "bg-orange-700"},
  poison: {text: "text-white", bg: "bg-purple-600"},
  ground: {text: "text-white", bg: "bg-yellow-600"},
  flying: {text: "text-white", bg: "bg-indigo-600"},
  bug: {text: "text-white", bg: "bg-lime-600"},
  rock: {text: "text-white", bg: "bg-gray-600"},
  ghost: {text: "text-white", bg: "bg-violet-700"},
  dragon: {text: "text-white", bg: "bg-indigo-800"},
  dark: {text: "text-white", bg: "bg-gray-800"},
  steel: {text: "text-white", bg: "bg-gray-500"},
  fairy: {text: "text-white", bg: "bg-pink-600"},
  normal: {text: "text-white", bg: "bg-gray-500"},
};

const BookmarksPage = () => {
  const {favorites, toggleFavorite} = useFavorites();
  const [detailedFavorites, setDetailedFavorites] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // Nytt state för vald typ

  useEffect(() => {
    async function fetchDetailedFavorites() {
      // För varje bokmärkt Pokémon, gör en fetch för att hämta detaljerad data
      const detailedData = await Promise.all(
        favorites.map(async (pokemon) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
          );
          const data = await response.json();
          // Lägg till Pokémon-typer till varje favorit
          return {
            ...pokemon,
            types: data.types.map((t) => t.type.name),
          };
        })
      );
      // Sätt den detaljerade Pokémon-informationen i state
      setDetailedFavorites(detailedData);
    }
    // Kör fetch-funktionen när favoritlistan ändras
    fetchDetailedFavorites();
  }, [favorites]);

  // Filter Pokémon efter vald typ
  const filteredFavorites = selectedType
    ? detailedFavorites.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      )
    : detailedFavorites;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bokmärkta:</h1>
        <img
          src="/pokemon logo.png"
          alt="Pokémon"
          className="w-48 h-auto ml-4"
        />
      </div>

      {/* Sökbar typ-filter */}
      <div className="mb-4 flex justify-center">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Alla typer</option>
          {Object.keys(typeColors).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Kontrollerar om det finns bokmärkta Pokémon */}
      {filteredFavorites.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {filteredFavorites.map((pokemon, index) => (
            <Link
              key={index}
              href={`/pokemon/${pokemon.id}`}
              className="w-64 m-4 text-center bg-gray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <div>
                {/* Renderar ut bilder och namn */}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="w-32 h-32 object-contain mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold">{pokemon.name}</h3>
                <p className="text-gray-700">
                  Type:{" "}
                  {pokemon.types && pokemon.types.length > 0
                    ? pokemon.types.map((type, index) => (
                        <span
                          key={index}
                          className={`${
                            typeColors[type]?.text || "text-white"
                          } ${
                            typeColors[type]?.bg || "bg-gray-500"
                          } px-3 py-1 rounded-full mr-2 mb-2`}
                        >
                          {type}
                          {index < pokemon.types.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : "Unknown"}
                </p>
                <span className="text-gray-700">{pokemon.element}</span>{" "}
                {/* Display Pokémon element */}
                {/* knapp för att ta bort favorit */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleFavorite(pokemon);
                  }}
                  className="text-red-500 hover:text-red-700 ml-4 text-2xl transform transition-transform duration-300 hover:scale-125"
                  aria-label={`Remove ${pokemon.name} from favorites`}
                >
                  ❤️
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Om inga Pokémon är bokmärkta så visas ett meddelande
        <p className="text-center text-lg text-gray-500">
          Inga bokmärkta Pokémon.
        </p>
      )}
    </div>
  );
};

export default BookmarksPage;
