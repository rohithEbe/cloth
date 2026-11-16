import React, { useState } from "react";
import { categories } from "../data/products";
import "./Categories.css";

const Categories = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="olivia-categories-section" id="categories">
      <div className="categories-wrapper">
        <div className="categories-header">
          <span className="categories-subtitle">Discover Collections</span>
          <h2 className="categories-heading">Featured Categories</h2>
          <p className="categories-desc">
            Explore our hand-picked collections curated just for you
          </p>
        </div>

        <div className="categories-grid-layout">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`category-tile ${activeId === cat.id ? "active" : ""}`}
              onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
            >
              {cat.tag && <span className="cat-tag">{cat.tag}</span>}
              <div className="category-img-container">
                <img src={cat.image} alt={cat.name} className="cat-img" />
                <div className="cat-overlay"></div>
              </div>
              <div className="cat-details">
                <span className="cat-icon-badge">{cat.icon}</span>
                <h3 className="cat-name">{cat.name}</h3>
                <span className="cat-count">{cat.itemCount}</span>
                <button className="cat-shop-btn">Shop Now →</button>
              </div>
            </div>
          ))}
        </div>

        <div className="categories-footer">
          <button className="view-all-btn">View All Categories</button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
