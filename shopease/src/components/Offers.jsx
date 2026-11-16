import React, { useState } from "react";
import { offers } from "../data/products";
import "./Offers.css";

const Offers = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2200);
  };

  return (
    <section className="olivia-offers-section" id="offers">
      <div className="offers-wrapper">
        <div className="offers-grid">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="luxury-offer-card"
              style={{ background: offer.gradient }}
            >
              <div className="offer-inner-border">
                <span className="offer-discount-tag">{offer.discount}</span>
                <h3 className="offer-heading">{offer.title}</h3>
                <p className="offer-text">{offer.subtitle}</p>

                <div className="offer-bottom-bar">
                  <div className="coupon-pill">
                    <span className="code-label">CODE:</span>
                    <strong className="code-text">{offer.code}</strong>
                    <button
                      className="coupon-copy-btn"
                      onClick={() => handleCopy(offer.code)}
                      title="Copy promo code"
                    >
                      {copiedCode === offer.code ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <a href="#featured" className="offer-action-btn">
                    Shop Now →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
