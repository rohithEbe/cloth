import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import Offers from "../components/Offers";
import "./Home.css";

const Home = ({ onAddToCart, onToggleWishlist, wishlistItems }) => {
  return (
    <main className="olivia-home-page">
      {/* Hero Banner Grid (Trendy Fashion Clothes) */}
      <Hero />

      {/* Featured Section: Top Seller Products + We Love Trend */}
      <FeaturedProducts
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistItems={wishlistItems}
      />

      {/* Categories Showcase */}
      <Categories />

      {/* Special Promotional Offers */}
      <Offers />
    </main>
  );
};

export default Home;
