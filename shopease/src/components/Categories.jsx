import React from "react";
import { categories } from "../data/products";
import "./Categories.css";

const Categories = () => {
  return (
    <section className="olivia-categories-section" id="categories">
      <div className="categories-wrapper">
        <div className="categories-header">
          <span className="categories-subtitle">Discover Collections</span>
          <h2 className="categories-heading">Featured Categories</h2>
        </div>

        <div className="categories-grid-layout">
          {categories.map((cat) => (
            <div key={cat.id} className="category-tile">
              <div className="category-img-container">
                <img src={cat.image} alt={cat.name} className="cat-img" />
                <div className="cat-overlay"></div>
              </div>
              <div className="cat-details">
                <span className="cat-icon-badge">{cat.icon}</span>
                <h3 className="cat-name">{cat.name}</h3>
                <span className="cat-count">{cat.itemCount}</span>
                <span className="cat-shop-link">Explore Now →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
