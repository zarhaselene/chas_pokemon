import { createContext, useContext, useEffect, useState } from "react";
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // State to store the list of favorite Pokémon
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorages
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === pokemon.id)) {
        // Remove the Pokémon if it's already a favorite
        return prevFavorites.filter((fav) => fav.id !== pokemon.id);
      } else {
        // Add the Pokémon to favorites
        return [...prevFavorites, pokemon];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook to access favorites context in components
export function useFavorites() {
  return useContext(FavoritesContext);
}
