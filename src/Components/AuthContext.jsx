import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./Firebase"; // Firebase Auth instance
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create Auth Context
const AuthContext = createContext();

// Provide authentication state globally
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? { email: currentUser.email, uid: currentUser.uid } : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook for easy use in components
export const useAuth = () => useContext(AuthContext);
