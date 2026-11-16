import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({
  cartCount = 0,
  wishlistCount = 0,
  onSearch,
  onOpenCart,
  onNavigateHome,
  onNavigateProducts,
  currentView = "home",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", action: onNavigateHome },
    { label: "Products", action: onNavigateProducts },
    { label: "Categories", action: null },
    { label: "Offers", action: null, badge: "Hot" },
    { label: "About", action: null },
    { label: "Contact", action: null },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) onSearch(searchQuery);
  };

  const handleMenuClick = (item) => {
    setMobileMenuOpen(false);
    if (item.action) item.action();
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="header-container top-row">
          {/* Brand Logo */}
          <div
            className="header-logo"
            onClick={onNavigateHome}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            <div className="logo-icon-box">🛍️</div>
            <span className="shopease-brand-name">
              Shop<span>Ease</span>
            </span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`nav-link ${
                  (item.label === "Home" && currentView === "home") ||
                  (item.label === "Products" && currentView === "products")
                    ? "active"
                    : ""
                }`}
                onClick={() => handleMenuClick(item)}
              >
                {item.label}
                {item.badge && (
                  <span className="nav-hot-badge">{item.badge}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit-btn" aria-label="Search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>

          {/* Action Buttons */}
          <div className="header-actions">
            {/* Wishlist */}
            <button className="action-icon-btn" title="Wishlist" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span className="action-badge">{wishlistCount}</span>
              )}
            </button>

            {/* Cart */}
            <button
              className={`action-icon-btn ${currentView === "cart" ? "cart-active" : ""}`}
              title="Shopping Cart"
              aria-label="Cart"
              onClick={onOpenCart}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-badge">{cartCount}</span>
            </button>

            {/* Account */}
            <button className="action-icon-btn" title="Account" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            {/* Login Button */}
            <button className="login-nav-btn">Login / Sign Up</button>

            {/* Mobile Hamburger */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
