import React, { useState } from "react";
import "./Cart.css";

const Cart = ({
  cartItems = [],
  onUpdateQty,
  onRemoveItem,
  onNavigateHome,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Calculate Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // Discount calculation
  const discountAmount = appliedPromo ? subtotal * appliedPromo.percent : 0;
  const discountedSubtotal = subtotal - discountAmount;

  // Tax calculation (approx 7% as in screenshot: $46 subtotal -> $3.22 tax)
  const estimatedTax = subtotal > 0 ? Number((discountedSubtotal * 0.07).toFixed(2)) : 0;

  // Grand Total
  const grandTotal = Number((discountedSubtotal + estimatedTax).toFixed(2));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const code = promoCode.trim().toUpperCase();

    if (!code) return;

    if (code === "SPRING30" || code === "SAVE25" || code === "OLIVIA25") {
      setAppliedPromo({ code, percent: 0.25 });
      setPromoCode("");
    } else {
      setPromoError("Invalid code. Try 'SAVE25' or 'SPRING30'");
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 4000);
  };

  return (
    <div className="cart-page-wrapper">
      {/* Top Banner Notice (Matching Screenshot) */}
      <div className="cart-announcement-bar">
        Order now and save 25% off everything for a limited time!
      </div>

      <div className="cart-page-container">
        {/* Top Header Row: Heading & Breadcrumb Steps */}
        <div className="cart-title-row">
          <h1 className="cart-main-heading">Your Shopping Cart</h1>

          {/* Stepper (Matching Screenshot) */}
          <div className="cart-step-indicator">
            <span className="step active">Cart</span>
            <span className="step-sep">→</span>
            <span className="step">Checkout</span>
            <span className="step-sep">→</span>
            <span className="step">Payment</span>
            <span className="step-sep">→</span>
            <span className="step">Success</span>
          </div>
        </div>

        {checkoutSuccess && (
          <div className="checkout-success-alert">
            🎉 Order successfully placed! Thank you for shopping with OLIVIA.
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your shopping cart is empty</h2>
            <p>Explore our latest spring collection and discover your favorite styles.</p>
            <button className="continue-shopping-btn" onClick={onNavigateHome}>
              ← Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content-grid">
            {/* Left Column: Cart Table */}
            <div className="cart-table-column">
              <div className="cart-table-header">
                <span className="col-product">Product</span>
                <span className="col-price">Price</span>
                <span className="col-qty">Qty</span>
                <span className="col-subtotal">Subtotal</span>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item, index) => {
                  const itemSubtotal = (item.price * (item.quantity || 1)).toFixed(2);
                  return (
                    <div key={item.cartItemId || item.id || index} className="cart-row-item">
                      {/* Row Index */}
                      <span className="row-number">{index + 1}</span>

                      {/* Product Thumbnail */}
                      <div className="product-thumb-box">
                        <img
                          src={item.image || "/images/product-1.jpg"}
                          alt={item.name}
                          className="product-thumb-img"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="product-meta">
                        <h3 className="product-title">{item.name}</h3>
                        <div className="product-variants">
                          <span className="variant-size">
                            Size: {item.size || "L"}
                          </span>
                          <span className="variant-color">
                            Color: {item.color || "Beige"}
                          </span>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="product-unit-price">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Quantity Stepper (< 1 >) */}
                      <div className="product-qty-stepper">
                        <button
                          className="stepper-arrow-btn"
                          onClick={() =>
                            onUpdateQty &&
                            onUpdateQty(
                              item.cartItemId || item.id,
                              Math.max(1, (item.quantity || 1) - 1)
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          &lt;
                        </button>
                        <span className="stepper-value">{item.quantity || 1}</span>
                        <button
                          className="stepper-arrow-btn"
                          onClick={() =>
                            onUpdateQty &&
                            onUpdateQty(
                              item.cartItemId || item.id,
                              (item.quantity || 1) + 1
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          &gt;
                        </button>
                      </div>

                      {/* Remove Trash Button */}
                      <button
                        className="item-remove-btn"
                        onClick={() =>
                          onRemoveItem && onRemoveItem(item.cartItemId || item.id)
                        }
                        title="Remove item"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="trash-icon"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        <span>Remove</span>
                      </button>

                      {/* Row Subtotal */}
                      <div className="product-row-subtotal">
                        ${itemSubtotal}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Table Bottom Totals Summary */}
              <div className="table-subtotals-row">
                <div className="subtotal-item">
                  <span className="subtotal-label">Total:</span>
                  <span className="subtotal-val">${subtotal.toFixed(2)}</span>
                </div>
                <div className="subtotal-item">
                  <span className="subtotal-label">Subtotal:</span>
                  <span className="subtotal-val">
                    ${(discountedSubtotal > 0 ? discountedSubtotal : subtotal / 2).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="promo-code-form">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button type="submit" className="apply-promo-btn">
                  Apply Code
                </button>
              </form>
              {promoError && <p className="promo-error-msg">{promoError}</p>}
              {appliedPromo && (
                <p className="promo-success-msg">
                  ✓ Promo "{appliedPromo.code}" applied (25% discount)!
                </p>
              )}
            </div>

            {/* Right Column: Order Summary Card (Matching Screenshot) */}
            <aside className="order-summary-sidebar">
              <div className="order-summary-card">
                <h2 className="summary-heading">Order Summary</h2>

                <div className="summary-line-row">
                  <span className="line-label">Subtotal:</span>
                  <span className="line-value">${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-line-row">
                  <span className="line-label">Shipping:</span>
                  <span className="line-value text-muted">
                    Calculated at next step
                  </span>
                </div>

                {appliedPromo && (
                  <div className="summary-line-row discount-row">
                    <span className="line-label">Discount (25%):</span>
                    <span className="line-value">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-line-row">
                  <span className="line-label">Estimated Tax:</span>
                  <span className="line-value">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total-row">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">${grandTotal.toFixed(2)}</span>
                </div>

                <button
                  className="checkout-primary-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>

              <button
                className="back-to-shop-btn"
                onClick={onNavigateHome}
              >
                ← Back to Catalog
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

