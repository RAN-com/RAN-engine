import { createContext, useContext, useState, useEffect } from "react";
import { db, collection, getDocs, setDoc, deleteDoc, doc } from "../Components/Firebase";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from Firestore when the app loads
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "favorites"));
        setFavorites(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  // Add to favorites and update Firestore
  const addToFavorites = async (video) => {
    try {
      await setDoc(doc(db, "favorites", video.id), video);
      setFavorites((prevFavorites) => [...prevFavorites, video]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Remove from favorites and update Firestore
  const removeFromFavorites = async (video) => {
    try {
      await deleteDoc(doc(db, "favorites", video.id));
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== video.id));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
