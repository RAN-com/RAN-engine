import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { db } from "./Firebase"; // Firestore instance
import { collection, doc, getDoc, addDoc, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Get authenticated user

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth(); // Get logged-in user
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "games", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct(productData);
          setMainImage(productData.images?.front || productData.image); // Default main image
        } else {
          setError("Product Not Found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add to Firestore Cart
  const addToCart = async () => {
    if (!user) {
      alert("You need to log in to add items to the cart!");
      return;
    }

    const cartRef = collection(db, "cart");
    const q = query(cartRef, where("userId", "==", user.uid), where("productId", "==", id));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("This item is already in your cart!");
      return;
    }

    // Use a fallback image in case the front image is undefined
    const productImage = product.images?.front || "/path/to/fallback/image.jpg"; // Provide a fallback image here

    await addDoc(cartRef, {
      userId: user.uid,
      productId: id,
      name: product.name,
      price: product.price,
      image: productImage, // Use the fallback image if front is undefined
      quantity: 1,
    });

    alert("Item added to cart successfully!");
  };

  if (loading) return <h2 className="text-center text-white">Loading...</h2>;
  if (error) return <h2 className="text-center text-white">{error}</h2>;

  return (
    <section className="py-10 px-5 bg-gray-900 text-white text-center">
      <h2 className="text-3xl font-bold mb-5">{product.name}</h2>

      {/* Main Image */}
      <div className="max-w-2xl mx-auto mb-5">
        <img
          src={mainImage}
          alt="Main View"
          className="w-full h-80 object-contain bg-gray-700 p-3 rounded-lg"
        />
      </div>

      {/* 5 Image Thumbnails */}
      <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
        {product.images?.slice(0, 5).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className="w-full h-20 object-contain bg-gray-700 p-2 rounded-lg cursor-pointer hover:opacity-75"
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-10 mt-5">
        <div>
          <h1 className="text-2xl text-gray-300">Description</h1>
          <p className="text-lg text-gray-300 mt-5">{product.description}</p>
          <p className="text-2xl font-bold text-yellow-500 mt-4">${product.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 mt-5">
        <button className="bg-blue-600 p-3 rounded-lg flex items-center gap-2" onClick={addToCart}>
          <FaShoppingCart /> Add to Cart
        </button>
        <button className="bg-red-600 p-3 rounded-lg flex items-center gap-2">
          <FaHeart /> Add to Wishlist
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
