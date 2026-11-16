import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { topSellerProducts, products } from "../data/products";
import "./FeaturedProducts.css";

const FeaturedProducts = ({ onAddToCart, onToggleWishlist, wishlistItems = [] }) => {
  const [activeTab, setActiveTab] = useState("Featured");
  const [slideIndex, setSlideIndex] = useState(0);

  const tabs = ["Featured", "Latest", "Best Seller"];

  // Filter products by active tab
  const filteredProducts = products.filter((p) =>
    activeTab === "Featured" ? true : p.tags?.includes(activeTab) || p.category === activeTab
  );

  // Pagination / slider for 3 products per view
  const itemsPerPage = 3;
  const maxSlide = Math.max(0, filteredProducts.length - itemsPerPage);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : maxSlide));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev < maxSlide ? prev + 1 : 0));
  };

  const visibleProducts = filteredProducts.slice(
    slideIndex,
    slideIndex + itemsPerPage
  );

  // If filtered result is fewer than 3, fallback to slice(0, 3)
  const displayProducts = visibleProducts.length > 0 ? visibleProducts : filteredProducts.slice(0, 3);

  return (
    <section className="trend-section" id="featured">
      <div className="trend-container">
        {/* Left Column: Top Seller Products */}
        <aside className="top-sellers-sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-title">Top Seller Products</h3>
            <div className="top-sellers-list">
              {topSellerProducts.map((item) => (
                <div key={item.id} className="mini-product-item">
                  <div className="mini-img-box">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="mini-info">
                    <div className="mini-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="mini-star">★</span>
                      ))}
                    </div>
                    <h4 className="mini-name">{item.name}</h4>
                    <div className="mini-price">
                      <span className="mini-orig">${item.originalPrice.toFixed(2)}</span>
                      <span className="mini-curr">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    className="mini-add-btn"
                    onClick={() => onAddToCart && onAddToCart(item)}
                    title="Add to cart"
                    aria-label="Add to cart"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: We Love Trend */}
        <main className="trend-main-content">
          <div className="trend-header">
            <h2 className="trend-title">We Love Trend</h2>

            <div className="trend-controls">
              {/* Filter Tabs */}
              <div className="trend-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`trend-tab-btn ${activeTab === tab ? "active" : ""}`}
                    onClick={() => {
                      setActiveTab(tab);
                      setSlideIndex(0);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Slider Arrows */}
              <div className="slider-arrows">
                <button
                  className="arrow-btn"
                  onClick={handlePrevSlide}
                  aria-label="Previous products"
                  title="Previous"
                >
                  ←
                </button>
                <button
                  className="arrow-btn"
                  onClick={handleNextSlide}
                  aria-label="Next products"
                  title="Next"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* 3-Column Product Cards Grid */}
          <div className="trend-cards-grid">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistItems.some((item) => item.id === product.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
};

export default FeaturedProducts;
