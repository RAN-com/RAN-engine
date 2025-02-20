import { useEffect, useState } from "react";
import { db } from "./Firebase"; // Import Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Get authenticated user

const useUserFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      const favoritesRef = collection(db, "favorites");
      const q = query(favoritesRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFavorites(items);
    };

    fetchFavorites();
  }, [user]);

  return favorites;
};
