import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="olivia-hero-section" id="home">
      <div className="hero-grid-container">
        {/* Left Primary Hero Banner */}
        <div className="hero-main-banner">
          <img
            src="/images/hero-main.jpg"
            alt="Trendy Fashion Clothes - Spring Collection"
            className="hero-banner-image"
          />
          <a
            href="#featured"
            className="hero-interactive-action-btn"
            title="Shop New Spring Collection"
          >
            Shop Now
          </a>
        </div>

        {/* Right Stacked Promos */}
        <div className="hero-side-banners">
          {/* Top Promo: 25% off Everything */}
          <div className="side-banner side-banner-top">
            <img
              src="/images/hero-top-right.jpg"
              alt="25% off Everything - Shop Now"
              className="side-banner-image"
            />
            <a
              href="#featured"
              className="side-interactive-link top-link"
              title="Shop 25% Off Deal"
            >
              Shop Now
            </a>
          </div>

          {/* Bottom Promo: Men Collection Up to 75% off */}
          <div className="side-banner side-banner-bottom">
            <img
              src="/images/hero-bottom-right.jpg"
              alt="Up to 75% off Men Collection - Shop Now"
              className="side-banner-image"
            />
            <a
              href="#featured"
              className="side-interactive-link bottom-link"
              title="Shop Men Collection"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
