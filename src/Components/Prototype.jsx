import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavorites } from "./FavoritesContext";
import { useState, useEffect } from "react";
import logo from '../assets/RanGamingLogo.png';

const ITEMS_PER_PAGE = 9;

const Prototypes = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    // Simulated data fetching
    const gamesList = [
      { id: "1", name: "Game 1", description: "Description 1", price: 19.99, image: "game1.jpg" },
      { id: "2", name: "Game 2", description: "Description 2", price: 29.99, image: "game2.jpg" }
    ];
    setGames(gamesList);
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedGames = filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="py-10 px-2 bg-gray-900 text-white text-center">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2">
        <h2 className="text-xl sm:text-2xl font-bold border-b-4 border-red-500 px-4 my-2 sm:my-0">Games</h2>
        <img src={logo} className="h-16 sm:h-40 w-auto" alt="Logo" />
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-60 placeholder-white px-4 py-2 text-white rounded-lg border border-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {displayedGames.map((game) => {
          const isFavorited = favorites.some((fav) => fav.id === game.id);

          return (
            <div key={game.id} className="w-full bg-gray-800 text-white p-5 rounded-lg shadow-lg">
              <Link to={`/proto/${game.id}`}>
                <img src={game.image} alt={game.name} className="w-full h-40 object-cover rounded-lg" />
                <h4 className="text-lg font-semibold mt-3">{game.name}</h4>
                <p className="text-sm text-gray-400">{game.description}</p>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <span className="text-yellow-500 font-bold">${game.price.toFixed(2)}</span>
                <button
                  onClick={() => isFavorited ? removeFromFavorites(game) : addToFavorites(game)}
                  className={`text-xl transition duration-300 ${isFavorited ? "text-red-500" : "text-gray-400"}`}
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center space-x-3">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>
    </section>
  );
};

export default Prototypes;
