import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { calculateOrderTotals, validateCoupon } from '../utils/pricing';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Products & Categories
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('auramart_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('auramart_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Fetch initial product dataset from DummyJSON API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data.products || []);

        // Extract unique categories dynamically
        const uniqueCategories = Array.from(
          new Set((data.products || []).map((p) => p.category))
        ).sort();
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Toast Dispatcher
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Operations
  const addToCart = (product, count = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + count,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail || product.images?.[0],
            category: product.category,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            quantity: count,
          },
        ];
      }
    });

    showToast(`Added "${product.title}" to cart!`, 'success');
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cart.find((i) => i.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.title}" from cart.`, 'info');
    }
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon('');
  };

  // Coupon application logic
  const handleApplyCoupon = (code) => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const result = validateCoupon(code, subtotal);

    if (result.valid) {
      setAppliedCoupon(result.code);
      showToast(result.message, 'success');
    } else {
      showToast(result.message || 'Invalid coupon code.', 'error');
    }
    return result;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    showToast('Coupon code removed.', 'info');
  };

  // Order Placement
  const placeOrder = (customerDetails) => {
    const totals = calculateOrderTotals(cart, appliedCoupon);
    const orderData = {
      orderId: 'AUR-' + Math.floor(100000 + Math.random() * 900000),
      orderDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer: customerDetails,
      items: [...cart],
      totals,
      appliedCoupon,
    };

    setLastOrderDetails(orderData);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderConfirmed(true);
    showToast('🎉 Order placed successfully!', 'success');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description &&
            product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (product.brand &&
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0; // default
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Order totals computed dynamically
  const orderTotals = useMemo(() => {
    return calculateOrderTotals(cart, appliedCoupon);
  }, [cart, appliedCoupon]);

  const value = {
    products: filteredProducts,
    allProductsCount: products.length,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon: handleApplyCoupon,
    removeCoupon: handleRemoveCoupon,
    orderTotals,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isOrderConfirmed,
    setIsOrderConfirmed,
    quickViewProduct,
    setQuickViewProduct,
    lastOrderDetails,
    placeOrder,
    toasts,
    showToast,
    removeToast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
