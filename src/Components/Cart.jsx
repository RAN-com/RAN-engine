import React, { useEffect, useState } from "react";
import { db } from "./Firebase"; // Firestore instance
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Get authenticated user

const Cart = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart Items from Firestore
  useEffect(() => {
    if (!user) return;

    const cartRef = collection(db, "cart");
    const q = query(cartRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCart(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0), 0).toFixed(2);
  };

  // Remove item from Firestore
  const removeItem = async (id) => {
    await deleteDoc(doc(db, "cart", id));
  };

  // Handle Checkout and clear Firestore cart
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert(`Your total is $${calculateTotal()}. Proceeding to checkout...`);

    // Remove all items from Firestore cart
    for (const item of cart) {
      await deleteDoc(doc(db, "cart", item.id));
    }
  };

  return (
    <div className="mt-10 p-5 bg-gray-800 rounded-lg text-white">
      <h3 className="text-xl font-semibold mb-3">Shopping Cart ({cart.length})</h3>

      {loading ? (
        <p className="text-gray-400">Loading cart items...</p>
      ) : cart.length > 0 ? (
        <>
          {/* Cart Item List */}
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="border-b border-gray-600 py-3 flex items-center gap-4">
                <img
                  src={item.images?.front || "https://via.placeholder.com/64"}
                  alt={item.name}
                  className="w-16 h-16 object-cover bg-gray-700 rounded-lg"
                />
                <span className="flex-1">{item.name}</span>
                <span className="text-yellow-400 font-bold">${item.price?.toFixed(2) || "0.00"}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
                >
                  Remove
                </button>
              </li>
            ))}
            {/* Total Price Display */}
            <li className="border-t border-gray-600 py-3 font-bold text-lg flex justify-between">
              <span>Total:</span>
              <span className="text-yellow-500">${calculateTotal()}</span>
            </li>
          </ul>

          {/* Checkout Button */}
          <button
            className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300"
            onClick={handleCheckout}
          >
            Checkout (${calculateTotal()})
          </button>
        </>
      ) : (
        <p className="text-gray-400">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
