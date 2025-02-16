import React, { useEffect, useState } from "react";
import { useFavorites } from "./context/FavoritesContext";
import Link from "next/link";
import Search from "./components/Search.js";
import PokemonCard from "./components/PokemonCard";

const BookmarksPage = () => {
  // Använder användarens favoritpokémon från context
  const { favorites, toggleFavorite } = useFavorites();
  // State för detaljerad information om favoriter
  const [detailedFavorites, setDetailedFavorites] = useState([]);
  // State för den valda sökfrågan
  const [selectedSearch, setSelectedSearch] = useState("");
  // State för filtrerade favoriter baserat på sökfrågan
  const [filteredFavorites, setFilteredFavorites] = useState([]);
// useEffect-hook som hämtar detaljerad information om favoriter från API:t när 'favorites' ändras
  useEffect(() => {
    async function fetchDetailedFavorites() {
      // Hämta detaljerad information om varje Pokémon genom att använda deras ID
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
      setDetailedFavorites(detailedData); // Uppdatera state med detaljerad information
      setFilteredFavorites(detailedData); // Initialt sätt alla favoriter som filtrerade
    }
    fetchDetailedFavorites();
  }, [favorites]);

  // Hantera sökningen
  const handleSearch = (query) => {
    setSelectedSearch(query);
    // Filtrera de detaljerade favoriterna baserat på sökfrågan
    const filtered = detailedFavorites.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
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

      {/* Sökfältet */}
      <div className="mb-4 flex justify-center w-full">
        <div className="flex justify-center w-full max-w-lg">
          <Search input={selectedSearch} setInput={handleSearch} />
        </div>
      </div>

      {/* Om det finns bokmärkta Pokémon */}
      {filteredFavorites.length > 0 ? (
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="flex flex-wrap justify-start gap-4 pb-4">
            {filteredFavorites.map((pokemon) => (
              // Använd PokemonCard för att rendera varje Pokémon
              <div key={pokemon.id} className="flex-shrink-0">
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
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