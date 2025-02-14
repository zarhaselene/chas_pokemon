import React, { useEffect, useState } from "react";
import { useFavorites } from "./context/FavoritesContext";
import Link from "next/link";
import PokemonCard from "./components/PokemonCard";
import Hero from "./components/Hero";
import Search from "./components/Search.js";

const BookmarksPage = () => {
  // Hämtar favorites (bokmärkta Pokémon) och toggleFavorite-funktion från context
  const { favorites, toggleFavorite } = useFavorites();
  // Lokala state-variabler för att hantera detaljerad data om favorit-Pokémon och filtrerade favoriter
  const [detailedFavorites, setDetailedFavorites] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [input, setInput] = useState("");

  // useEffect för att hämta detaljerad information om varje favorit-Pokémon vid första renderingen eller när favorites ändras
  useEffect(() => {
    async function fetchDetailedFavorites() {
      const detailedData = await Promise.all(
        favorites.map(async (pokemon) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
          );
          const data = await response.json();
          // Returnerar en ny Pokémon-objekt med detaljerad typdata
          return {
            ...pokemon,
            types: data.types.map((t) => t.type.name),
          };
        })
      );
      // Uppdaterar state med den detaljerade informationen
      setDetailedFavorites(detailedData);
      setFilteredFavorites(detailedData);
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
    <div className="min-h-screen flex flex-col ">
      {/* Hero components*/}
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
          <p className="text-center text-lg text-gray-500">
            Inga bokmärkta Pokémon.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
