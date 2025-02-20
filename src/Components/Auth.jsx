import React, { useState } from "react";
import { auth } from "./Firebase"; // Firebase setup
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const Auth = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created successfully! You can log in now.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Logged in successfully!");
        onClose(); // Close the modal after successful login
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setMessage("Please enter your email first.");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-200">
      <div className="bg-gray-800  text-white p-6 rounded-lg shadow-lg w-80 sidebar-bg">
     
        <h2 className="text-lg font-bold text-center mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        {message && <p className="text-red-400 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-transporant focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-transporant focus:outline-none"
            required
          />
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 p-3 rounded">
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-4">
          <button onClick={() => setIsRegister(!isRegister)} className="text-yellow-400 hover:underline">
            {isRegister ? "Already have an account? Login" : "Create an account"}
          </button>
          {!isRegister && (
            <button onClick={handleForgotPassword} className="text-blue-400 hover:underline">
              Forgot Password?
            </button>
          )}
        </div>

        <button onClick={onClose} className="w-full mt-4 bg-gray-600 hover:bg-gray-700 p-2 rounded">
          Close
        </button>
      </div>
    
    <style>
        {`
          /* Background Image */
          .sidebar-bg {
            background-image: url('https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg');
            background-size: cover;
            background-position: center;
            position: relative;
            
          }
        `}
      </style>
    </div>
    
  );
};

export default Auth;
