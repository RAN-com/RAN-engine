import { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "../Components/Firebase"; // Added deleteDoc, doc, and updateDoc

const AdminPanel = ({ fetchGames }) => {
  const [newGame, setNewGame] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
  });
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null); // State to track the game being edited

  // Fetch all games from Firestore
  const fetchAllGames = async () => {
    const querySnapshot = await getDocs(collection(db, "games"));
    const gamesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setGames(gamesList);
  };

  useEffect(() => {
    fetchAllGames();
  }, []);

  // Function to Add a Game
  const handleAddGame = async (e) => {
    e.preventDefault();
    if (!newGame.name || !newGame.image || !newGame.description || !newGame.price) {
      alert("All fields are required");
      return;
    }

    // Add new game to Firestore
    await addDoc(collection(db, "games"), {
      name: newGame.name,
      image: newGame.image,
      description: newGame.description,
      price: parseFloat(newGame.price),
    });

    // Reset form and fetch games
    setNewGame({ name: "", image: "", description: "", price: "" });
    fetchAllGames();
  };

  // Function to Edit a Game
  const handleEditGame = (game) => {
    setEditingGame(game); // Set the game to be edited
    setNewGame(game); // Pre-fill the form with the game's data
  };

  // Function to Save Edited Game
  const handleSaveEditedGame = async (e) => {
    e.preventDefault();
    if (!newGame.name || !newGame.image || !newGame.description || !newGame.price) {
      alert("All fields are required");
      return;
    }

    // Update the game in Firestore
    const gameDocRef = doc(db, "games", newGame.id);
    await updateDoc(gameDocRef, {
      name: newGame.name,
      image: newGame.image,
      description: newGame.description,
      price: parseFloat(newGame.price),
    });

    // Reset form and fetch games
    setEditingGame(null);
    setNewGame({ name: "", image: "", description: "", price: "" });
    fetchAllGames();
  };

  // Function to Delete a Game
  const handleDeleteGame = async (id) => {
    const gameDocRef = doc(db, "games", id);
    await deleteDoc(gameDocRef);
    fetchAllGames(); // Fetch updated list after deletion
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg my-4 text-white">
      <h3 className="text-lg font-semibold mb-2">{editingGame ? "Edit Game" : "Add New Game"}</h3>
      <form onSubmit={editingGame ? handleSaveEditedGame : handleAddGame}>
        <input
          type="text"
          placeholder="Game Name"
          value={newGame.name}
          onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
          className="w-full mb-2 px-3 placeholder-white py-2 text-black rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newGame.image}
          onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
          className="w-full mb-2 px-3 py-2 placeholder-white text-black rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newGame.description}
          onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
          className="w-full mb-2 px-3 py-2 placeholder-white text-black rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newGame.price}
          onChange={(e) => setNewGame({ ...newGame, price: e.target.value })}
          className="w-full mb-2 px-3 py-2 placeholder-white text-black rounded"
        />
        <button type="submit" className="bg-green-500 px-4 py-2 rounded text-white">
          {editingGame ? "Save Changes" : "Add Game"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-4">Product List</h3>
      <table className="w-full mt-4 table-auto border-collapse border border-gray-700">
        <thead>
          <tr>
            <th className="border px-4 py-2">Game Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 ? (
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-center">
                No games 
              </td>
            </tr>
          ) : (
            games.map((game) => (
              <tr key={game.id}>
                <td className="border px-4 py-2">{game.name}</td>
                <td className="border px-4 py-2">{game.description}</td>
                <td className="border px-4 py-2">${game.price.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  <img src={game.image} alt={game.name} className="w-12 h-12 object-cover" />
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEditGame(game)} className="bg-blue-500 px-4 py-2 text-white rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteGame(game.id)} className="bg-red-500 px-4 py-2 text-white rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
