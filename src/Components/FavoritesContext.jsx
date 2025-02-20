import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (game) => {
    setFavorites((prevFavorites) => [...prevFavorites, game]);
  };

  const removeFromFavorites = (gameId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((game) => game.id !== gameId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
