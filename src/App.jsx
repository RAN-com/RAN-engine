import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./Components/FavoritesContext";
import { AuthProvider, useAuth } from "./Components/AuthContext"; 
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Cart from "./components/Cart";
import Favorites from "./components/Favorites";
import Footer from "./components/Footer";
import ProductDetails from "./components/About";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import AdminPanel from "./Admin/Admin";
import AdminLayout from "./Admin/AdminLayout";
import AdminLogin from "./Admin/AdminLogin";
 // Admin login page

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user?.isAdmin ? element : <AdminLogin />;
};

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto p-5">
              <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/categories" element={<Categories addToCart={addToCart} />} />
                <Route path="/cart" element={<Cart cart={cart} />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={<ProtectedRoute element={<AdminLayout />} />} />
              </Routes>

              <div className="py-10">
                <Footer />
              </div>
            </div>
          </div>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
