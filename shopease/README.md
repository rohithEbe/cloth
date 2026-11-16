# 🛍️ OLIVIA - Modern Fashion & Lifestyle E-Commerce

A pixel-accurate, component-modular React frontend recreating the **OLIVIA** fashion store homepage with independent CSS files for every component and interactive state handling.

---

## 📁 Updated File Architecture (With Dedicated CSS per Component)

```text
shopease/
│
├── public/
│   ├── index.html                  # HTML entry point with Google Fonts (Playfair Display, Montserrat)
│   └── images/                     # Static public assets
│
├── src/
│   ├── assets/
│   │   └── images/                 # Bundled graphic assets
│   │
│   ├── components/
│   │   ├── Navbar.jsx              # Top header + taupe secondary nav bar
│   │   ├── Navbar.css              # Navbar standalone stylesheet
│   │   ├── Hero.jsx                # "Trendy Fashion Clothes" + side promos
│   │   ├── Hero.css                # Hero section standalone stylesheet
│   │   ├── FeaturedProducts.jsx    # "Top Seller Products" sidebar + "We Love Trend"
│   │   ├── FeaturedProducts.css    # Featured products standalone stylesheet
│   │   ├── ProductCard.jsx         # Card with rating, quick wishlist & cart action
│   │   ├── ProductCard.css         # Product card standalone stylesheet
│   │   ├── Categories.jsx          # Featured categories grid
│   │   ├── Categories.css          # Categories standalone stylesheet
│   │   ├── Offers.jsx              # Voucher deals with 1-click code copying
│   │   ├── Offers.css              # Offers standalone stylesheet
│   │   ├── Footer.jsx              # Brand info, social links & newsletter form
│   │   └── Footer.css              # Footer standalone stylesheet
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Homepage layout orchestrating sections
│   │   └── Home.css                # Homepage standalone stylesheet
│   │
│   ├── data/
│   │   └── products.js             # Catalog items, top sellers & vouchers
│   │
│   ├── App.js                      # Root app with cart, wishlist & toast state
│   ├── App.css                     # App global shell & toast styles
│   ├── index.js                    # React 18 DOM mount
│   └── index.css                   # Global resets & color variables
│
├── package.json
└── README.md
```

---

## ⚡ Interactive Features Included

1. **Cart & Wishlist Badges**:
   - Clicking quick add-to-cart on cards or mini top-seller items increments the cart counter in the header with visual feedback and a floating toast alert.
   - Clicking the heart icon toggles item wishlist status and updates the header badge.

2. **Interactive Trend Filtering & Slider**:
   - Filter "We Love Trend" products by **Featured**, **Latest**, or **Best Seller** tabs.
   - Click `←` and `→` navigation arrows to cycle and slide through product listings.

3. **1-Click Coupon Code Copy**:
   - In the Offers section, clicking "Copy" instantly copies promo codes (e.g., `SPRING30`) to the clipboard with confirmation.

4. **Dedicated CSS Modularity**:
   - Every single component (`Navbar`, `Hero`, `FeaturedProducts`, `ProductCard`, `Categories`, `Offers`, `Footer`, `Home`, `App`) has its own independent `.css` file.

---

## 🚀 Running the Project

```bash
cd shopease
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
