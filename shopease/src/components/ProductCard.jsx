import React, { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted = false }) => {
  const [added, setAdded] = useState(false);

  const handleCartClick = (e) => {
    e.stopPropagation();
    setAdded(true);
    if (onAddToCart) {
      onAddToCart(product);
    }
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  return (
    <div className="olivia-product-card">
      {/* Product Image Box */}
      <div className="card-image-wrapper">
        {/* Floating Quick Action Icons (as seen in screenshot) */}
        <div className="floating-actions">
          {/* Heart Wishlist Button */}
          <button
            className={`quick-action-btn wishlist-icon-btn ${isWishlisted ? "active" : ""}`}
            onClick={handleWishlistClick}
            aria-label="Save to wishlist"
            title="Wishlist"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "#8d7363" : "none"}
              stroke={isWishlisted ? "#8d7363" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          {/* Quick Add to Cart Button */}
          <button
            className={`quick-action-btn cart-icon-btn ${added ? "added" : ""}`}
            onClick={handleCartClick}
            aria-label="Quick add to cart"
            title={added ? "Added to cart" : "Add to cart"}
          >
            {added ? (
              <span className="check-icon">✓</span>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="card-main-img"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="card-info">
        {/* Rating Stars (Yellow outlined/filled stars) */}
        <div className="card-stars">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`star ${i < (product.rating || 5) ? "filled" : ""}`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Product Title */}
        <h3 className="card-title" title={product.subtitle || product.name}>
          {product.name}
        </h3>

        {/* Product Price */}
        <div className="card-price-row">
          {product.originalPrice && (
            <span className="price-original">${product.originalPrice.toFixed(2)}</span>
          )}
          <span className="price-current">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
