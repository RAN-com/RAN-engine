// import { FaHeart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useFavorites } from "../Components/FavoritesContext";
// import { useState, useEffect } from "react";
// import { db, collection, getDocs } from "../Components/Firebase";
// import logo from '../assets/RanGamingLogo.png';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ITEMS_PER_PAGE = 9;

// const VideoShow = () => {
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const [videos, setVideos] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "videos"));
//       setVideos(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const filteredVideos = videos.filter((video) =>
//     video.title?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const displayedVideos = filteredVideos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   const handleFavoriteToggle = (video) => {
//     const isFavorited = favorites.some((fav) => fav.id === video.id);

//     if (isFavorited) {
//       removeFromFavorites(video);
//       toast.info(`${video.title} removed from favorites!`, { position: "top-center", autoClose: 1500 });
//     } else {
//       addToFavorites(video);
//       toast.success(`${video.title} added to favorites! ❤️`, { position: "top-center", autoClose: 1500 });
//     }
//   };

//   return (
//     <section className="py-10 px-2 bg-gray-900 text-white text-center">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2">
//         <h2 className="text-xl sm:text-2xl font-bold border-b-4 border-red-500 px-4 my-2 sm:my-0">Videos</h2>
//         <img src={logo} className="h-16 sm:h-40 w-auto" alt="Logo" />
//         <input
//           type="text"
//           placeholder="Search videos..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full sm:w-60 placeholder-white px-4 py-2 text-white rounded-lg border border-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
//         />
//       </div>

//       {/* Video Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
//         {displayedVideos.map((video) => {
//           const isFavorited = favorites.some((fav) => fav.id === video.id);

//           return (
//             <div key={video.id} className="w-full bg-gray-800 text-white p-5 rounded-lg shadow-lg">
//               <Link to={`/video/${video.id}`}>
//                 <img src={video.thumbnail} alt={video.title || "No Title"} className="w-full h-40 object-cover rounded-lg" />
//                 <h4 className="text-lg font-semibold mt-3">{video.title || "No Title"}</h4>
//                 <p className="text-sm text-gray-400">{video.description || "No description available."}</p>
//               </Link>
//               <div className="flex justify-between items-center mt-4">
//                 <button
//                   onClick={() => handleFavoriteToggle(video)}
//                   className={`text-xl transition duration-300 ${isFavorited ? "text-red-500" : "text-gray-400"}`}
//                 >
//                   <FaHeart />
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="mt-6 flex justify-center space-x-3">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentPage(index + 1)}
//               className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-yellow-500 text-black" : "bg-gray-700 text-white hover:bg-gray-600"}`}
//             >
//               {index + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default VideoShow;
