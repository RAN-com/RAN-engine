import { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "../Components/Firebase";

const AdminPanel = () => {
  const [newVideo, setNewVideo] = useState({ title: "", thumbnail: "", description: "", url: "" });
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);

  const [newGame, setNewGame] = useState({ name: "", image: "", description: "", price: "" });
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    fetchAllVideos();
    fetchAllGames();
  }, []);

  const fetchAllVideos = async () => {
    const querySnapshot = await getDocs(collection(db, "videos"));
    setVideos(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const fetchAllGames = async () => {
    const querySnapshot = await getDocs(collection(db, "games"));
    setGames(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.thumbnail || !newVideo.description || !newVideo.url) return alert("All fields are required");
    
    if (editingVideo) {
      await updateDoc(doc(db, "videos", newVideo.id), newVideo);
      setEditingVideo(null);
    } else {
      await addDoc(collection(db, "videos"), newVideo);
    }
    setNewVideo({ title: "", thumbnail: "", description: "", url: "" });
    fetchAllVideos();
  };

  const handleDeleteVideo = async (id) => {
    await deleteDoc(doc(db, "videos", id));
    fetchAllVideos();
  };

  const handleGameSubmit = async (e) => {
    e.preventDefault();
    if (!newGame.name || !newGame.image || !newGame.description || !newGame.price) return alert("All fields are required");
    
    if (editingGame) {
      await updateDoc(doc(db, "games", newGame.id), newGame);
      setEditingGame(null);
    } else {
      await addDoc(collection(db, "games"), { ...newGame, price: parseFloat(newGame.price) });
    }
    setNewGame({ name: "", image: "", description: "", price: "" });
    fetchAllGames();
  };

  const handleDeleteGame = async (id) => {
    await deleteDoc(doc(db, "games", id));
    fetchAllGames();
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg my-4 text-white">
      <h3 className="text-lg font-semibold mb-2">{editingVideo ? "Edit Video" : "Add New Video"}</h3>
      <form onSubmit={handleVideoSubmit} className="mb-4">
        <input type="text" placeholder="Title" value={newVideo.title} onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })} className="w-full mb-2 p-2" />
        <input type="text" placeholder="Thumbnail" value={newVideo.thumbnail} onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })} className="w-full mb-2 p-2" />
        <input type="text" placeholder="Description" value={newVideo.description} onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })} className="w-full mb-2 p-2" />
        <input type="text" placeholder="URL" value={newVideo.url} onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })} className="w-full mb-2 p-2" />
        <button type="submit" className="bg-green-500 p-2 rounded">{editingVideo ? "Save Changes" : "Add Video"}</button>
      </form>
      <h3 className="text-lg font-semibold">Video List</h3>
      <ul>
        {videos.map((video) => (
          <li key={video.id} className="mb-2">
            {video.title} - <button onClick={() => setEditingVideo(video)} className="bg-blue-500 p-1 rounded">Edit</button>
            <button onClick={() => handleDeleteVideo(video.id)} className="bg-red-500 p-1 ml-2 rounded">Delete</button>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-4">{editingGame ? "Edit Game" : "Add New Game"}</h3>
      <form onSubmit={handleGameSubmit} className="mb-4">
        <input type="text" placeholder="Name" value={newGame.name} onChange={(e) => setNewGame({ ...newGame, name: e.target.value })} className="w-full mb-2 p-2" />
        <input type="text" placeholder="Image" value={newGame.image} onChange={(e) => setNewGame({ ...newGame, image: e.target.value })} className="w-full mb-2 p-2" />
        <input type="text" placeholder="Description" value={newGame.description} onChange={(e) => setNewGame({ ...newGame, description: e.target.value })} className="w-full mb-2 p-2" />
        <input type="number" placeholder="Price" value={newGame.price} onChange={(e) => setNewGame({ ...newGame, price: e.target.value })} className="w-full mb-2 p-2" />
        <button type="submit" className="bg-green-500 p-2 rounded">{editingGame ? "Save Changes" : "Add Game"}</button>
      </form>
      <h3 className="text-lg font-semibold">Game List</h3>
      <ul>
        {games.map((game) => (
          <li key={game.id} className="mb-2">
            {game.name} - <button onClick={() => setEditingGame(game)} className="bg-blue-500 p-1 rounded">Edit</button>
            <button onClick={() => handleDeleteGame(game.id)} className="bg-red-500 p-1 ml-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
