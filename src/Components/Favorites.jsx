import { FaTrash } from "react-icons/fa";
import { useFavorites } from "./FavoritesContext";
import { useState, useEffect } from "react";
import { db, collection, getDocs, deleteDoc, doc } from "./Firebase"; // Import Firestore methods

const ITEMS_PER_PAGE = 9; // Show 9 items per page

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [firebaseFavorites, setFirebaseFavorites] = useState([]);

  // Fetch favorites from Firestore
  useEffect(() => {
    const fetchFavorites = async () => {
      const querySnapshot = await getDocs(collection(db, "favorites"));
      const fetchedFavorites = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFirebaseFavorites(fetchedFavorites);
    };

    fetchFavorites();
  }, []); // Empty dependency array to fetch only once on mount

  // Filter favorites based on search query
  const filteredFavorites = firebaseFavorites.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFavorites.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedFavorites = filteredFavorites.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Function to remove favorite from Firestore
  const handleRemoveFavorite = async (productId) => {
    try {
      await deleteDoc(doc(db, "favorites", productId));
      setFirebaseFavorites(firebaseFavorites.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error removing favorite: ", error);
    }
  };

  return (
    <section className="py-10 px-2 bg-gray-900 h-full text-white text-center">
      <h2 className="text-2xl font-bold mb-5 border-b-4 border-red-500 w-40 mx-auto">My Favorites</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search favorites..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-5 p-2 w-full max-w-md border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-red-500"
      />

      {filteredFavorites.length === 0 ? (
        <p className="text-gray-400">No favorite games added yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {displayedFavorites.map((product) => (
              <div key={product.id} className="w-full bg-gray-800 text-white p-5 rounded-lg shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h4 className="text-lg font-semibold mt-3">{product.name}</h4>
                <p className="text-sm text-gray-400">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-yellow-500 font-bold">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Favorites;
