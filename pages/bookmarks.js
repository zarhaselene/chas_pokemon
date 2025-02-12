import React, { useEffect, useState } from "react";
import { useFavorites } from "./context/FavoritesContext";
import Link from "next/link";

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

const BookmarksPage = () => {
  // Hämtar listan över bokmärkta Pokémon från kontexten
  const { favorites, toggleFavorite } = useFavorites();
  const [detailedFavorites, setDetailedFavorites] = useState([]);
// Hämtar detaljerad Pokémon information för varje favorit
  useEffect(() => {
    async function fetchDetailedFavorites() {
      // För varje bokmärkt Pokémon, gör en fetch för att hämta detaljerad data
      const detailedData = await Promise.all(
        favorites.map(async (pokemon) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
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
      {/* Kontrollerar om det finns bokmärkta Pokémon */}
      {detailedFavorites.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {detailedFavorites.map((pokemon, index) => (
            <Link key={index} href={`/pokemon/${pokemon.id}`} className="w-64 m-4 text-center bg-gray-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
              <div>
                {/* Renderar ut bilder och namn */}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="w-32 h-32 object-contain mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold">{pokemon.name}</h3>
                <p className="text-gray-700">
                  Type: {pokemon.types && pokemon.types.length > 0 ? (
                    pokemon.types.map((type, index) => (
                      <span key={index} className={`${typeColors[type] || "text-black"}`}>
                        {type}
                        {index < pokemon.types.length - 1 ? ", " : ""}
                      </span>
                    ))
                  ) : (
                    "Unknown"
                  )}
                </p> {/* Display Pokémon type */}
                <span className="text-gray-700">{pokemon.element}</span> {/* Display Pokémon element */}
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