import React, {useEffect, useState} from "react";
import {useFavorites} from "./context/FavoritesContext";
import Link from "next/link";
import Search from "./components/Search.js";
import PokemonCard from "./components/PokemonCard";
import Hero from "./components/Hero";

const BookmarksPage = () => {
  // Använder användarens favoritpokémon från context
  const {favorites, toggleFavorite} = useFavorites();
  // State för detaljerad information om favoriter
  const [detailedFavorites, setDetailedFavorites] = useState([]);
  // State för den valda sökfrågan
  const [input, setInput] = useState("");
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
    setInput(query);
    // Filtrerar favoriter baserat på om namnet eller id:t matchar sökfrågan
    const filtered = detailedFavorites.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
        pokemon.id.toString().includes(query)
      );
    });

    setFilteredFavorites(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero*/}
      <Hero
        title="Your Favorite Pokémons"
        subtitle="Here are all the Pokémons you've bookmarked. Explore and manage your collection!"
        image="https://media.tenor.com/7guvvXVPhG0AAAAi/pikachu-pokemon.gif"
      >
        <Search input={input} setInput={handleSearch} width="md:w-[600px]" />
      </Hero>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Om det finns bokmärkta Pokémon */}
        {filteredFavorites.length > 0 ? (
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pb-4">
            {filteredFavorites.map((pokemon) => (
              // Använd PokemonCard för att rendera varje Pokémon
              <div key={pokemon.id} className="flex-shrink-0">
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <img
              src="https://media.tenor.com/lc0bFgqDj4gAAAAi/pikachu-triste.gif"
              alt="No Pokémon found"
              className="w-32"
            />
            <p className="text-center text-lg text-gray-500">
              No bookmarked Pokémon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
