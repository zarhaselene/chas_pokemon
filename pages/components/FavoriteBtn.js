import React from "react";
import {useFavorites} from "../context/FavoritesContext";
import {FaHeart, FaRegHeart} from "react-icons/fa";

const FavoriteBtn = ({pokemon}) => {
  const {favorites, toggleFavorite} = useFavorites();
  // Check if it already is favorited
  const isFavorite = favorites.some((fav) => fav.id === pokemon.id);

  return (
    <button
      onClick={() => toggleFavorite({id: pokemon.id, name: pokemon.name})}
      className={`mt-2 px-2 py-2`}
    >
      {isFavorite ? (
        <FaHeart className="text-2xl text-red-500 hover:text-red-600" /> //Filled heart
      ) : (
        <FaRegHeart className="text-2xl text-red-500 hover:text-red-600" /> //Empty heart
      )}
    </button>
  );
};

export default FavoriteBtn;
