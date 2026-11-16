import React, { useState, useEffect } from "react";
import { shopProducts } from "../data/products";
import "./Products.css";

const Products = ({ onAddToCart, onToggleWishlist, wishlistItems = [] }) => {
  // Filters state
  const [selectedCategories, setSelectedCategories] = useState(["Fashion"]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState("Popularity");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [activePage, setActivePage] = useState(2);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Modern Category filter improvements
  const [categorySearch, setCategorySearch] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categoryList = [
    { name: "Electronics", icon: "💻", count: 24 },
    { name: "Fashion", icon: "👗", count: 32 },
    { name: "Shoes", icon: "👟", count: 18 },
    { name: "Watches", icon: "⌚", count: 12 },
    { name: "Accessories", icon: "👜", count: 20 },
    { name: "Home & Living", icon: "🏠", count: 14 },
    { name: "Beauty & Cosmetics", icon: "💄", count: 28 },
    { name: "Jewelry", icon: "✨", count: 16 },
    { name: "Sports & Fitness", icon: "🏃", count: 19 },
    { name: "Kids & Toys", icon: "🧸", count: 11 },
  ];

  const filteredCategoryOptions = categoryList.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const visibleCategories =
    categorySearch.trim().length > 0 || showAllCategories
      ? filteredCategoryOptions
      : filteredCategoryOptions.slice(0, 6);

  // Live countdown timer state (5d 12h 34m 27s)
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    mins: 34,
    secs: 27,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: 59, secs: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryToggle = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange(50000);
    setSelectedRating(null);
  };

  // Filter products
  let filtered = shopProducts.filter((p) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
      return false;
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
      return false;
    }
    if (p.price > priceRange) {
      return false;
    }
    if (selectedRating && p.rating < selectedRating) {
      return false;
    }
    return true;
  });

  // Sort
  if (sortBy === "Price: Low to High") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "Rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Fallback to show all products if filters yield none so page stays lively
  const displayProducts = filtered.length > 0 ? filtered : shopProducts;

  return (
    <div className="shop-page-wrapper">
      {/* Top Banner (Exact Match: Our Collection - Premium Products Just for You) */}
      <section className="shop-hero-banner">
        <div className="banner-inner-box">
          <div className="banner-left-col">
            <div className="collection-tag">
              <span className="slashes">///</span>
              <span>OUR COLLECTION</span>
              <span className="h-line"></span>
            </div>
            <h1 className="banner-hero-heading">
              Premium Products <br />
              <span>Just for You</span>
            </h1>
            <p className="banner-subtext">Discover the best deals and latest trends</p>
            <a href="#shop-grid" className="shop-banner-btn">
              Shop Now <span>→</span>
            </a>
          </div>

          <div className="banner-center-img">
            <img
              src="/images/shop-hero-banner.jpg"
              alt="Premium Products Just for You"
              className="banner-model-photo"
            />
          </div>

          <div className="banner-right-script">
            <span className="script-line-1">Shop Smart ♡</span>
            <span className="script-line-2">Live Better</span>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="shop-main-layout" id="shop-grid">
        {/* Left Filter Sidebar */}
        <aside className="shop-filter-sidebar">
          <div className="filter-card">
            {/* Filter Title Bar */}
            <div className="filter-header-bar">
              <div className="filter-icon-title">
                <span className="funnel-icon">🌪️</span>
                <h3>Filter Products</h3>
              </div>
              <button className="clear-filters-link" onClick={handleClearFilters}>
                Clear All
              </button>
            </div>

            {/* Categories Accordion */}
            <div className={`filter-group ${isCategoriesOpen ? "open" : "collapsed"}`}>
              <div
                className="group-title clickable-title"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                role="button"
                tabIndex={0}
              >
                <span>Categories</span>
                <span className={`caret-icon ${isCategoriesOpen ? "rotate-up" : "rotate-down"}`}>
                  ⌃
                </span>
              </div>

              {isCategoriesOpen && (
                <div className="category-filter-body">
                  {/* Category Search Input (Web standard for large category lists) */}
                  <div className="category-search-wrapper">
                    <span className="cat-search-icon">🔍</span>
                    <input
                      type="text"
                      className="category-search-input"
                      placeholder="Search categories..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                    />
                    {categorySearch && (
                      <button
                        className="cat-search-clear"
                        onClick={() => setCategorySearch("")}
                        title="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Categories list */}
                  <div className="filter-options-list">
                    {visibleCategories.map((cat) => (
                      <label key={cat.name} className="filter-checkbox-row">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => handleCategoryToggle(cat.name)}
                        />
                        <span className="checkmark-box"></span>
                        <span className="cat-icon">{cat.icon}</span>
                        <span className="filter-name">{cat.name}</span>
                        <span className="filter-count">({cat.count})</span>
                      </label>
                    ))}

                    {filteredCategoryOptions.length === 0 && (
                      <p className="no-cat-found">No categories matching "{categorySearch}"</p>
                    )}
                  </div>

                  {/* Show More / Show Less Toggle button */}
                  {!categorySearch && filteredCategoryOptions.length > 6 && (
                    <button
                      type="button"
                      className="toggle-more-cat-btn"
                      onClick={() => setShowAllCategories(!showAllCategories)}
                    >
                      {showAllCategories
                        ? "− Show Less"
                        : `+ Show ${filteredCategoryOptions.length - 6} More`}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <div className="group-title">
                <span>Price Range</span>
                <span className="caret-icon">⌃</span>
              </div>
              <div className="range-slider-wrapper">
                <input
                  type="range"
                  min="0"
                  max="70000"
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="brown-range-input"
                />
                <div className="range-labels">
                  <span>₹0</span>
                  <span>₹{priceRange.toLocaleString("en-IN")}+</span>
                </div>
                <div className="quick-price-pills">
                  <button
                    className={`price-pill ${priceRange <= 1000 ? "active" : ""}`}
                    onClick={() => setPriceRange(1000)}
                  >
                    Under ₹1k
                  </button>
                  <button
                    className={`price-pill ${priceRange === 5000 ? "active" : ""}`}
                    onClick={() => setPriceRange(5000)}
                  >
                    ₹1k - ₹5k
                  </button>
                  <button
                    className={`price-pill ${priceRange === 10000 ? "active" : ""}`}
                    onClick={() => setPriceRange(10000)}
                  >
                    ₹5k - ₹10k
                  </button>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="filter-group">
              <div className="group-title">
                <span>Brands</span>
                <span className="caret-icon">⌃</span>
              </div>
              <div className="filter-options-list">
                {[
                  { name: "Nike", count: 12 },
                  { name: "Adidas", count: 10 },
                  { name: "Puma", count: 8 },
                  { name: "Zara", count: 6 },
                  { name: "Others", count: 18 },
                ].map((brand) => (
                  <label key={brand.name} className="filter-checkbox-row">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.name)}
                      onChange={() => handleBrandToggle(brand.name)}
                    />
                    <span className="checkmark-box"></span>
                    <span className="filter-name">{brand.name}</span>
                    <span className="filter-count">({brand.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="filter-group">
              <div className="group-title">
                <span>Ratings</span>
                <span className="caret-icon">⌃</span>
              </div>
              <div className="filter-options-list">
                <label className="filter-checkbox-row">
                  <input
                    type="radio"
                    name="rating-filter"
                    checked={selectedRating === 4}
                    onChange={() => setSelectedRating(4)}
                  />
                  <span className="radio-box"></span>
                  <span className="star-icon">★</span>
                  <span className="filter-name">& above</span>
                  <span className="filter-count">(45)</span>
                </label>
                <label className="filter-checkbox-row">
                  <input
                    type="radio"
                    name="rating-filter"
                    checked={selectedRating === 3}
                    onChange={() => setSelectedRating(3)}
                  />
                  <span className="radio-box"></span>
                  <span className="star-icon">★</span>
                  <span className="filter-name">& above</span>
                  <span className="filter-count">(62)</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Catalog Column */}
        <main className="shop-catalog-main">
          {/* Header Controls Bar */}
          <div className="catalog-top-bar">
            <div className="products-count-label">
              Showing {displayProducts.length} of {shopProducts.length} products
            </div>

            <div className="catalog-controls-right">
              {/* Sort Dropdown */}
              <div className="sort-dropdown-box">
                <span className="sort-label">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="Popularity">Popularity</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Rating">Rating</option>
                </select>
              </div>

              {/* View Mode Buttons */}
              <div className="view-mode-toggles">
                <button
                  className={`mode-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button
                  className={`mode-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"></line>
                    <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"></line>
                    <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"></line>
                    <circle cx="4" cy="6" r="1.5"></circle>
                    <circle cx="4" cy="12" r="1.5"></circle>
                    <circle cx="4" cy="18" r="1.5"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips (Modern web filter UX) */}
          {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedRating) && (
            <div className="active-filter-chips-bar">
              <span className="chips-label">Applied:</span>
              <div className="chips-list">
                {selectedCategories.map((cat) => (
                  <span key={cat} className="filter-chip">
                    {cat}
                    <button
                      type="button"
                      onClick={() => handleCategoryToggle(cat)}
                      className="chip-remove"
                      title={`Remove ${cat}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {selectedBrands.map((b) => (
                  <span key={b} className="filter-chip">
                    {b}
                    <button
                      type="button"
                      onClick={() => handleBrandToggle(b)}
                      className="chip-remove"
                      title={`Remove ${b}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {selectedRating && (
                  <span className="filter-chip">
                    ★ {selectedRating}+
                    <button
                      type="button"
                      onClick={() => setSelectedRating(null)}
                      className="chip-remove"
                      title="Clear rating"
                    >
                      ✕
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  className="clear-all-chips-btn"
                  onClick={handleClearFilters}
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

          {/* Product Cards Grid (4 Columns as in Screenshot) */}
          <div className={`shop-products-grid ${viewMode === "list" ? "list-mode" : ""}`}>
            {displayProducts.map((product) => {
              const isWish = wishlistItems.some((w) => w.id === product.id);
              return (
                <div key={product.id} className="shop-product-card">
                  {/* Top Bar: Discount Pill & Wishlist Button */}
                  <div className="card-top-badges">
                    <span className="discount-red-pill">{product.discount}</span>
                    <button
                      className={`card-wishlist-icon ${isWish ? "wishlisted" : ""}`}
                      onClick={() => onToggleWishlist && onToggleWishlist(product)}
                      title="Add to Wishlist"
                    >
                      {isWish ? "❤️" : "♡"}
                    </button>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="card-image-box">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="shop-card-img"
                    />
                  </div>

                  {/* Rating Line */}
                  <div className="card-rating-line">
                    <span className="star-gold">★</span>
                    <span className="score">{product.rating}</span>
                    <span className="reviews">({product.reviews})</span>
                  </div>

                  {/* Product Title */}
                  <h4 className="card-product-name" title={product.name}>
                    {product.name}
                  </h4>

                  {/* Price Row (INR Format) */}
                  <div className="card-price-row">
                    <span className="inr-current">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="inr-original">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Action Buttons: Add to Cart + Eye Preview */}
                  <div className="card-action-btns">
                    <button
                      className="add-to-cart-brown-btn"
                      onClick={() => onAddToCart && onAddToCart(product)}
                    >
                      <span>🛒</span> Add to Cart
                    </button>
                    <button
                      className="quick-view-eye-btn"
                      onClick={() => setQuickViewProduct(product)}
                      title="Quick View"
                    >
                      👁
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination (Exact Match: < 1 [2] 3 4 >) */}
          <div className="shop-pagination-row">
            <button
              className="page-nav-arrow"
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
            >
              &lt;
            </button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`page-num-circle ${activePage === page ? "active" : ""}`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="page-nav-arrow"
              onClick={() => setActivePage((p) => Math.min(4, p + 1))}
              disabled={activePage === 4}
            >
              &gt;
            </button>
          </div>
        </main>
      </div>

      {/* Bottom Promo Banner (Special Offer! Countdown) */}
      <section className="shop-countdown-banner">
        <div className="countdown-container">
          <div className="gift-box-wrapper">
            <img
              src="/images/gift-box.png"
              alt="Special Gift Box"
              className="gift-img"
            />
          </div>

          <div className="offer-text-block">
            <h2 className="special-offer-title">Special Offer!</h2>
            <p className="special-offer-sub">Get up to 50% OFF on selected items</p>
          </div>

          <a href="#shop-grid" className="shop-the-deal-btn">
            Shop the Deal →
          </a>

          <div className="countdown-timer-boxes">
            <div className="timer-box">
              <span className="timer-num">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="timer-unit">Days</span>
            </div>
            <div className="timer-box">
              <span className="timer-num">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="timer-unit">Hours</span>
            </div>
            <div className="timer-box">
              <span className="timer-num">
                {String(timeLeft.mins).padStart(2, "0")}
              </span>
              <span className="timer-unit">Mins</span>
            </div>
            <div className="timer-box">
              <span className="timer-num">
                {String(timeLeft.secs).padStart(2, "0")}
              </span>
              <span className="timer-unit">Secs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="quickview-backdrop"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="quickview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal-btn"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <div className="modal-content-grid">
              <div className="modal-img-col">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="modal-product-img"
                />
              </div>
              <div className="modal-details-col">
                <span className="modal-discount-tag">
                  {quickViewProduct.discount} OFF
                </span>
                <h3 className="modal-product-title">{quickViewProduct.name}</h3>
                <div className="modal-rating-row">
                  <span>★ {quickViewProduct.rating}</span>
                  <span className="text-muted">({quickViewProduct.reviews})</span>
                </div>
                <div className="modal-price-row">
                  <span className="modal-curr-price">
                    ₹{quickViewProduct.price.toLocaleString("en-IN")}
                  </span>
                  <span className="modal-orig-price">
                    ₹{quickViewProduct.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="modal-desc">{quickViewProduct.description}</p>
                <div className="modal-actions-row">
                  <button
                    className="modal-add-cart-btn"
                    onClick={() => {
                      onAddToCart && onAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    className="modal-wish-btn"
                    onClick={() => {
                      onToggleWishlist && onToggleWishlist(quickViewProduct);
                    }}
                  >
                    ♡ Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

