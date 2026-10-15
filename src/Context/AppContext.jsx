import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Axios global config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// Create context
export const AppContext = createContext();

// Provider component
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = "Rs. ";

  // State
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartitems, setCartItems] = useState({});
  const [searchQuery, setsearchQuery] = useState("");

  // Fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch {
      setIsSeller(false);
    }
  };

  // Fetch user and cart
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success && data.user) {
        setUser(data.user);
        setCartItems(data.user.cartitems || {});
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch {
      setUser(null);
      setCartItems({});
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add to cart
  const addtoCart = (itemId) => {
    if (!itemId) {
      toast.error("Invalid product ID");
      return;
    }

    const cartData = { ...cartitems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  // Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    const cartData = { ...cartitems };
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove from cart
  const removeFromcart = (itemId) => {
    const cartData = { ...cartitems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Removed from Cart");
  };

  // Get cart count
  const getCartCount = () =>
    Object.values(cartitems).reduce((sum, qty) => sum + qty, 0);

  // Get cart total amount
  const getCartamount = () => {
    let total = 0;
    for (const itemId in cartitems) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        total += product.price * cartitems[itemId];
      }
    }
    return total;
  };

  // Initial fetch
  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, []);

  // Sync cart to backend
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartitems });
        if (!data.success) {
          console.log(data.message); // Don't show toast for auth errors
        }
      } catch (error) {
        console.log(error.message); // Don't show toast for auth errors
      }
    };

    if (user && Object.keys(cartitems).length > 0) {
      updateCart();
    }
  }, [cartitems, user]);

  // Context value
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setshowUserLogin,
    products,
    currency,
    cartitems,
    addtoCart,
    updateCartItem,
    removeFromcart,
    getCartCount,
    getCartamount,
    searchQuery,
    setsearchQuery,
    axios,
    fetchProducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
