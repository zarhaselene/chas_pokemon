import React from "react";
import { useFavorites } from "./context/FavoritesContext";
import Link from "next/link";

const BookmarksPage = () => {
  // Hämtar listan över bokmärkta Pokémon från kontexten
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
       {/* Tillbaka-knapp */}
       <Link href="/">
        <span className="text-blue-500 hover:underline mb-4 inline-block">
          Tillbaka till startsidan
        </span>
      </Link>
      <h1 className="text-4xl font-bold text-center mb-8">Bokmärkta Pokémon</h1>
      {/* Kontrollerar om det finns bokmärkta Pokémon */}
      {favorites.length > 0 ? (
        // Om vi har bokmärken så listas dem
        favorites.map((pokemon, index) => (
          <div key={index} className="mb-4 text-center">
            {/* Renderar ut bilder och namn */}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
              alt={pokemon.name}
              className="w-32 h-32 object-contain mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold">{pokemon.name}</h3>
            {/* knapp för att ta bort favorit */}
            <button
              onClick={() => toggleFavorite(pokemon)} 
              className="text-red-500 hover:text-red-700 ml-4"
              aria-label={`Remove ${pokemon.name} from favorites`}
            >
              ❤️
            </button>
            {/* Länk till Pokémon detaljsidan */}
            <Link href={`/pokemon/${pokemon.name}`}>
              <span className="text-blue-500 hover:underline">
                Visa detaljer
              </span>
            </Link>
          </div>
        ))
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
