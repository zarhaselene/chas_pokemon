import React, { useEffect, useState } from "react";
import { useFavorites } from "./context/FavoritesContext";
import Link from "next/link";

const typeColors = {
  grass: { text: "text-white", bg: "bg-green-700" },
  fire: { text: "text-white", bg: "bg-red-700" },
  water: { text: "text-white", bg: "bg-blue-700" },
  electric: { text: "text-white", bg: "bg-yellow-600" },
  psychic: { text: "text-white", bg: "bg-purple-700" },
  ice: { text: "text-white", bg: "bg-cyan-600" },
  fighting: { text: "text-white", bg: "bg-orange-700" },
  poison: { text: "text-white", bg: "bg-purple-600" },
  ground: { text: "text-white", bg: "bg-yellow-600" },
  flying: { text: "text-white", bg: "bg-indigo-600" },
  bug: { text: "text-white", bg: "bg-lime-600" },
  rock: { text: "text-white", bg: "bg-gray-600" },
  ghost: { text: "text-white", bg: "bg-violet-700" },
  dragon: { text: "text-white", bg: "bg-indigo-800" },
  dark: { text: "text-white", bg: "bg-gray-800" },
  steel: { text: "text-white", bg: "bg-gray-500" },
  fairy: { text: "text-white", bg: "bg-pink-600" },
  normal: { text: "text-white", bg: "bg-gray-500" },
};

const BookmarksPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [detailedFavorites, setDetailedFavorites] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    async function fetchDetailedFavorites() {
      const detailedData = await Promise.all(
        favorites.map(async (pokemon) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
          );
          const data = await response.json();
          return {
            ...pokemon,
            types: data.types.map((t) => t.type.name),
          };
        })
      );
      setDetailedFavorites(detailedData);
      setFilteredFavorites(detailedData);
    }
    fetchDetailedFavorites();
  }, [favorites]);

  // Hanterar sökningen
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSelectedSearch(query);

    const filtered = detailedFavorites.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(query) ||
        pokemon.id.toString().includes(query)
      );
    });

    setFilteredFavorites(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="text-center mb-8 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bokmärkta:</h1>
        <img
          src="/pokemon logo.png"
          alt="Pokémon"
          className="w-48 h-auto ml-4"
        />
      </div>

      {/* Sökfält för namn eller ID */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={selectedSearch}
          onChange={handleSearch}
          placeholder="Search by name or ID..."
          className="p-2 border rounded-lg w-80"
        />
      </div>

      {/* Om det finns bokmärkta Pokémon */}
      {filteredFavorites.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {filteredFavorites.map((pokemon, index) => (
            <Link
              key={index}
              href={`/pokemon/${pokemon.id}`}
              className="w-64 m-4 text-center bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 relative"
            >
              {/* Hjärt-knappen längst upp till höger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleFavorite(pokemon);
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl transform transition-transform duration-300 hover:scale-125"
                aria-label={`Remove ${pokemon.name} from favorites`}
              >
                ❤️
              </button>

              <div className="mb-4">
                {/* Pokémon bild */}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="w-32 h-32 object-contain mx-auto"
                />
              </div>

              {/* Pokémon namn och ID */}
              <h3 className="text-2xl font-semibold">{pokemon.name}</h3>
              <p className="text-gray-600 text-sm">
                {" "}
                #{pokemon.id.toString().padStart(3, "0")}
              </p>

              {/* Pokémon typer */}
              <div className="mt-2">
                {pokemon.types && pokemon.types.length > 0
                  ? pokemon.types.map((type, index) => (
                      <span
                        key={index}
                        className={`${typeColors[type]?.text || "text-white"} ${
                          typeColors[type]?.bg || "bg-gray-500"
                        } px-3 py-1 rounded-full mr-2 mb-2`}
                      >
                        {type}
                      </span>
                    ))
                  : "Unknown"}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Inga bokmärkta Pokémon.
        </p>
      )}
    </div>
  );
};

export default BookmarksPage;
