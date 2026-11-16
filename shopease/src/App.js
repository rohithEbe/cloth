import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  // Pre-populated cart with two reference items
  const [cart, setCart] = useState([
    {
      cartItemId: "cart-1",
      id: 1,
      name: "Lightweight Zipped Bomber Jacket",
      price: 23.0,
      quantity: 1,
      size: "L",
      color: "Beige",
      image: "/images/cart-item-1.jpg",
    },
    {
      cartItemId: "cart-2",
      id: 101,
      name: "Damien Wide Chest",
      price: 23.0,
      quantity: 1,
      size: "S",
      color: "Cream",
      image: "/images/cart-item-2.jpg",
    },
  ]);

  const [wishlist, setWishlist] = useState([]);
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'cart' | 'products'
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2800);
  };

  // Add to cart
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartItemId: `cart-${Date.now()}-${product.id}`,
          quantity: 1,
          size: product.size || "M",
          color: product.color || "Standard",
        },
      ];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  // Update quantity
  const handleUpdateQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.cartItemId || item.id) === cartItemId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove from cart
  const handleRemoveItem = (cartItemId) => {
    const removed = cart.find(
      (item) => (item.cartItemId || item.id) === cartItemId
    );
    setCart((prev) =>
      prev.filter((item) => (item.cartItemId || item.id) !== cartItemId)
    );
    if (removed) showToast(`Removed "${removed.name}" from cart.`);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to wishlist!`);
    }
  };

  // Navigation helpers
  const goToCart = () => {
    setCurrentView("cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToProducts = () => {
    setCurrentView("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      showToast(`Searching for: "${query}"`);
    }
  };

  const totalCartCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className="olivia-app">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="olivia-toast" role="alert">
          <span className="toast-dot"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar — wired to 3 views */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onSearch={handleSearch}
        onOpenCart={goToCart}
        onNavigateHome={goHome}
        onNavigateProducts={goToProducts}
        currentView={currentView}
      />

      {/* Page Routing (No React Router needed) */}
      {currentView === "cart" && (
        <Cart
          cartItems={cart}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onNavigateHome={goHome}
        />
      )}

      {currentView === "products" && (
        <Products
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistItems={wishlist}
        />
      )}

      {currentView === "home" && (
        <Home
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistItems={wishlist}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
