import React, { useEffect, useMemo, useState } from "react";

const API_URL = "https://fakestoreapi.com/products";
const INR_CONVERSION_RATE = 80;
const STANDARD_DELIVERY_FEE = 150;
const FREE_DELIVERY_THRESHOLD = 2000;

const COUPONS = {
  WELCOME10: { type: "percent", value: 10 },
  SAVE200: { type: "fixed", value: 200 },
  AURA15: { type: "percent", value: 15 },
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.map((item) => ({
          id: item.id,
          name: item.title,
          price: Math.round(item.price * INR_CONVERSION_RATE),
          category: item.category,
          image: item.image,
        })));
      })
      .catch(() => setCouponMessage("Failed to load products. Check your internet connection."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = products.filter((p) => {
    const categoryMatch = category === "all" || p.category === category;
    const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;

  const discount = useMemo(() => {
    if (!appliedCoupon || subtotal <= 0) return 0;
    const coupon = appliedCoupon;
    const amount =
      coupon.type === "percent"
        ? Math.round((subtotal * coupon.value) / 100)
        : coupon.value;
    return Math.min(amount, subtotal);
  }, [subtotal, appliedCoupon]);

  const total = Math.max(0, subtotal + deliveryFee - discount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      return exists
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...current, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
    if (cart.length === 1) clearCoupon();
  }

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setAppliedCoupon(null);
      setCouponError(true);
      setCouponMessage("Please enter a coupon code.");
      return;
    }

    if (!COUPONS[code]) {
      setAppliedCoupon(null);
      setCouponError(true);
      setCouponMessage("Invalid coupon code.");
      return;
    }

    if (cart.length === 0) {
      setCouponError(true);
      setCouponMessage("Add items to the cart before applying a coupon.");
      return;
    }

    setAppliedCoupon(COUPONS[code]);
    setCouponInput(code);
    setCouponError(false);
    setCouponMessage(`${code} applied successfully!`);
  }

  function clearCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMessage("");
    setCouponError(false);
  }

  function checkout() {
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Order placed successfully! Total: ₹${total.toLocaleString()}`);
    setCart([]);
    clearCoupon();
    setCartOpen(false);
  }

  return (
    <>
      <div className="promo-bar">
        🚚 <strong>Special Offer:</strong> FREE Delivery on orders above ₹2,000!
      </div>

      <header>
        <div className="nav-container">
          <div className="logo">Aura API Store</div>
          <input
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search API products..."
          />
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>Live API Catalog</h1>
          <p>Products fetched dynamically via REST API</p>
        </section>

        <div className="filter-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loader">Loading products from API...</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <div className="product-title">{product.name}</div>
                  <div className="product-price">₹{product.price.toLocaleString()}</div>
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)} />}

      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={() => setCartOpen(false)}>×</button>
        </div>

        <div className="cart-items">
          {!cart.length ? (
            <p className="muted">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <small>₹{item.price.toLocaleString()} × {item.quantity}</small>
                </div>
                <div>
                  <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="shipping-msg">
            {subtotal === 0
              ? "Add items to calculate delivery"
              : subtotal >= FREE_DELIVERY_THRESHOLD
              ? "🎉 You qualified for FREE Delivery!"
              : `Add ₹${(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()} more for FREE delivery!`}
          </div>

          <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
          <div className="summary-row"><span>Delivery Fee</span><span>{deliveryFee === 0 && subtotal > 0 ? "FREE" : `₹${deliveryFee}`}</span></div>

          <div className="coupon-box">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon code"
              maxLength={20}
            />
            <button onClick={applyCoupon}>Apply</button>
          </div>

          <div className={`coupon-message ${couponError ? "error" : "success"}`}>
            {couponMessage}
          </div>

          <div className="coupon-hint">
            🎁 <strong>Save more at checkout!</strong><br />
            <code>WELCOME10</code> 10% off · <code>SAVE200</code> ₹200 off · <code>AURA15</code> 15% off
          </div>

          <div className="summary-row"><span>Discount</span><span>-₹{discount.toLocaleString()}</span></div>
          <div className="summary-row total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>

          <button className="checkout-btn" onClick={checkout}>
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
