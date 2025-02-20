import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./Firebase";

const ComingSoon = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black items-center justify-center bg-gray-900 text-white text-center p-6">
     
      <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-lg mb-6">Stay tuned for an exciting launch!</p>
      <button className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600">
        Book Now
      </button>
      {!user ? (
        <button
          onClick={handleLogin}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Login with Google
        </button>
      ) : (
        <p className="mt-4">Welcome, {user.displayName}!</p>
      )}
    </div>
  );
};

export default ComingSoon;