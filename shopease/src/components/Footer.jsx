import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="olivia-footer">
      <div className="footer-top-section">
        <div className="footer-content-wrapper footer-grid-layout">
          {/* Brand Info */}
          <div className="footer-col brand-column">
            <div className="footer-logo">
              <span className="footer-emblem">OD</span>
              <span className="footer-brand-name">OLIVIA</span>
            </div>
            <p className="footer-desc">
              Curated contemporary fashion and accessories crafted for timeless style,
              unrivaled comfort, and everyday confidence.
            </p>
            <div className="footer-social-row">
              <a href="#social" aria-label="Instagram">📸</a>
              <a href="#social" aria-label="Pinterest">📌</a>
              <a href="#social" aria-label="Facebook">📘</a>
              <a href="#social" aria-label="Twitter">🐦</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="col-heading">Collections</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#fashion">Spring Fashion</a></li>
              <li><a href="#men">Men Collection</a></li>
              <li><a href="#women">Women Collection</a></li>
              <li><a href="#cosmetic">Cosmetics & Glow</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h4 className="col-heading">Customer Service</h4>
            <ul className="footer-links">
              <li><a href="#help">Help & Support</a></li>
              <li><a href="#shipping">Track Order</a></li>
              <li><a href="#returns">Returns & Exchange</a></li>
              <li><a href="#faq">Delivery Info</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col newsletter-column">
            <h4 className="col-heading">Join the Club</h4>
            <p className="newsletter-text">
              Subscribe to receive updates, access to exclusive deals, and new season previews.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form-box">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
            {subscribed && (
              <span className="newsletter-confirm">
                ✓ Thank you for subscribing to OLIVIA!
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="footer-bottom-section">
        <div className="footer-content-wrapper bottom-bar-flex">
          <p>© {new Date().getFullYear()} OLIVIA Fashion Group. All rights reserved.</p>
          <div className="footer-payment-icons">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
