import React, { useState } from "react";
import { auth, db } from "../Components/Firebase"; // Firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import { useAuth } from "../Components/AuthContext"; // Import Auth Context

const AdminLogin = () => {
  const authContext = useAuth(); 
  const setUser = authContext?.setUser; 

  if (!setUser) {
    console.error("AuthContext is missing or setUser is undefined. Ensure AuthProvider is wrapped around the app.");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        await setDoc(doc(db, "admins", user.uid), {
          email,
          role: "admin",
        });

        setUser({ email, isAdmin: true });
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser({ email: userCredential.user.email, isAdmin: true });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError("Please enter your email first.");
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">
          {isRegister ? "Admin Register" : "Admin Login"}
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Admin Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 p-3 rounded text-white font-semibold transition-all"
          >
            {isRegister ? "Register as Admin" : "Login"}
          </button>
        </form>

        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-yellow-400 hover:underline text-sm"
          >
            {isRegister ? "Already an admin? Login" : "Need an admin account? Register"}
          </button>
          {!isRegister && (
            <button onClick={handleForgotPassword} className="text-blue-400 hover:underline text-sm mt-2">
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
