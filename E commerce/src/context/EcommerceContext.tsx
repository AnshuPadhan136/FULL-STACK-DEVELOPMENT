import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  User, UserRole, Product, Category, CartItem, DiscountCode, 
  Order, OrderStatus, Review, SalesAnalytics 
} from '../types/ecommerce';
import { 
  DEMO_USERS, INITIAL_CATEGORIES, INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, INITIAL_DISCOUNTS, INITIAL_ORDERS 
} from '../data/initialData';

export type AppViewMode = 'store' | 'admin' | 'blueprint';
export type BlueprintTab = 'architecture' | 'schema' | 'folder' | 'snippets' | 'roadmap';
export type SortOption = 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest';

interface EcommerceContextType {
  // App navigation & mode state
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  blueprintTab: BlueprintTab;
  setBlueprintTab: (tab: BlueprintTab) => void;

  // Auth User state
  currentUser: User;
  switchUserRole: (role: UserRole) => void;

  // Products & Categories
  products: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string; // categoryId or 'all'
  setSelectedCategory: (categoryId: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStock: boolean) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Cart
  cartItems: CartItem[];
  appliedDiscount: DiscountCode | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  applyDiscountCode: (codeStr: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  clearCart: () => void;
  cartSubtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingFee: number;
  cartTotal: number;

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  createOrder: (shippingAddress: any, paymentMethodStr: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  trackingOrder: Order | null;
  setTrackingOrder: (order: Order | null) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;

  // Reviews
  reviews: Review[];
  addReview: (productId: string, rating: number, comment: string) => void;
  getProductReviews: (productId: string) => Review[];

  // Discounts
  discounts: DiscountCode[];

  // Analytics
  analytics: SalesAnalytics;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

export const EcommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Mode
  const [viewMode, setViewMode] = useState<AppViewMode>('store');
  const [blueprintTab, setBlueprintTab] = useState<BlueprintTab>('architecture');

  // Auth User
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS[0]);

  const switchUserRole = (role: UserRole) => {
    if (role === 'admin') {
      setCurrentUser(DEMO_USERS[1]);
      setViewMode('admin');
    } else if (role === 'customer') {
      setCurrentUser(DEMO_USERS[0]);
      setViewMode('store');
    } else {
      setCurrentUser({
        id: `usr_guest_${Date.now()}`,
        name: 'Guest Shopper',
        email: 'guest@aistudio-demo.com',
        role: 'guest',
        joinedDate: new Date().toISOString().split('T')[0]
      });
      setViewMode('store');
    }
  };

  // Products state (persisted or defaults)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aistudio_ecom_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('aistudio_ecom_products', JSON.stringify(products));
  }, [products]);

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 500]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCat = p.categoryName.toLowerCase().includes(query);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesTags) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }

      // Price filter
      if (p.price < priceRange[0] || p.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (p.rating < minRating) {
        return false;
      }

      // Stock filter
      if (inStockOnly && p.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, priceRange, minRating, inStockOnly, sortBy]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aistudio_ecom_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('aistudio_ecom_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const itemKey = `${product.id}-${color || 'std'}-${size || 'std'}`;
    setCartItems(prev => {
      const existing = prev.find(i => i.id === itemKey);
      if (existing) {
        return prev.map(i => i.id === itemKey ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
        return [...prev, { id: itemKey, product, quantity, selectedColor: color, selectedSize: size }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === cartItemId ? { ...i, quantity } : i));
  };

  const [discounts] = useState<DiscountCode[]>(INITIAL_DISCOUNTS);

  const applyDiscountCode = (codeStr: string) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = discounts.find(d => d.code === cleanCode && d.active);
    
    if (!found) {
      return { success: false, message: 'Invalid or expired promo code.' };
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      return { success: false, message: `Minimum cart value of $${found.minSpend} required for this code.` };
    }

    setAppliedDiscount(found);
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedDiscount(null);
  };

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedDiscount) return 0;
    if (appliedDiscount.code === 'FREESHIP') return 0; // handled in shipping
    return (cartSubtotal * appliedDiscount.discountPercent) / 100;
  }, [appliedDiscount, cartSubtotal]);

  const taxAmount = useMemo(() => {
    const taxableSubtotal = Math.max(0, cartSubtotal - discountAmount);
    return taxableSubtotal * 0.08; // 8% sales tax
  }, [cartSubtotal, discountAmount]);

  const shippingFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    if (appliedDiscount?.code === 'FREESHIP') return 0;
    return cartSubtotal >= 100 ? 0 : 4.99;
  }, [cartItems, cartSubtotal, appliedDiscount]);

  const cartTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - discountAmount + taxAmount + shippingFee);
  }, [cartSubtotal, discountAmount, taxAmount, shippingFee]);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aistudio_ecom_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('aistudio_ecom_orders', JSON.stringify(orders));
  }, [orders]);

  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  const createOrder = (shippingAddress: any, paymentMethodStr: string): Order => {
    const newOrderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowISO = new Date().toISOString();
    
    // Delivery estimated 3 days from now
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);

    const newOrder: Order = {
      id: newOrderId,
      userId: currentUser.id,
      userName: shippingAddress.fullName || currentUser.name,
      userEmail: shippingAddress.email || currentUser.email,
      items: [...cartItems],
      subtotal: cartSubtotal,
      discountAmount,
      discountCodeApplied: appliedDiscount?.code,
      tax: taxAmount,
      shippingFee,
      totalAmount: cartTotal,
      shippingAddress,
      paymentMethod: paymentMethodStr,
      status: 'payment_confirmed',
      trackingNumber: `TRK-${Math.floor(100000000 + Math.random() * 900000000)}US`,
      carrier: 'FedEx Express',
      estimatedDelivery: estDate.toISOString().split('T')[0],
      createdAt: nowISO,
      history: [
        { status: 'pending', timestamp: nowISO, note: 'Order created.' },
        { status: 'payment_confirmed', timestamp: nowISO, note: `Payment authorized via ${paymentMethodStr}.` }
      ]
    };

    // Update stock levels
    setProducts(prev => prev.map(p => {
      const purchasedItem = cartItems.find(i => i.product.id === p.id);
      if (purchasedItem) {
        return { ...p, stock: Math.max(0, p.stock - purchasedItem.quantity) };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setTrackingOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const nowISO = new Date().toISOString();
        const updatedHistory = [
          ...o.history,
          { status, timestamp: nowISO, note: note || `Status updated to ${status}.` }
        ];
        return { ...o, status, history: updatedHistory };
      }
      return o;
    }));
  };

  // Product CRUD
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewCount: 0
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const addReview = (productId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `rev_${Date.now()}`,
      productId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      rating,
      comment,
      createdAt: new Date().toISOString().split('T')[0],
      verifiedPurchase: true
    };
    setReviews(prev => [newReview, ...prev]);

    // Recalculate product rating
    const prodReviews = [...reviews.filter(r => r.productId === productId), newReview];
    const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;

    updateProduct(productId, {
      rating: Number(avgRating.toFixed(1)),
      reviewCount: prodReviews.length
    });
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  // Analytics
  const analytics: SalesAnalytics = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalOrd = orders.length;
    const totalProd = products.length;
    const totalCust = new Set(orders.map(o => o.userEmail)).size + 1;

    return {
      totalRevenue: totalRev,
      totalOrders: totalOrd,
      totalProducts: totalProd,
      totalCustomers: totalCust,
      monthlyRevenue: [
        { month: 'Mar', sales: 4200, orders: 38 },
        { month: 'Apr', sales: 6100, orders: 52 },
        { month: 'May', sales: 7800, orders: 64 },
        { month: 'Jun', sales: 9400, orders: 81 },
        { month: 'Jul', sales: 11200, orders: 95 },
        { month: 'Aug', sales: Math.round(totalRev) + 1200, orders: totalOrd + 10 }
      ],
      categoryDistribution: [
        { categoryName: 'Audio & Sound', percentage: 35, revenue: totalRev * 0.35 },
        { categoryName: 'Electronics & Gadgets', percentage: 28, revenue: totalRev * 0.28 },
        { categoryName: 'Modern Apparel', percentage: 18, revenue: totalRev * 0.18 },
        { categoryName: 'Wearables & Accessories', percentage: 12, revenue: totalRev * 0.12 },
        { categoryName: 'Home & Workspace', percentage: 7, revenue: totalRev * 0.07 }
      ]
    };
  }, [orders, products]);

  return (
    <EcommerceContext.Provider
      value={{
        viewMode, setViewMode,
        blueprintTab, setBlueprintTab,
        currentUser, switchUserRole,
        products, categories, selectedProduct, setSelectedProduct,
        addProduct, updateProduct, deleteProduct,
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        priceRange, setPriceRange,
        minRating, setMinRating,
        inStockOnly, setInStockOnly,
        sortBy, setSortBy, resetFilters,
        filteredProducts,
        cartItems, appliedDiscount, isCartOpen, setIsCartOpen,
        addToCart, removeFromCart, updateCartQuantity,
        applyDiscountCode, removeDiscountCode, clearCart,
        cartSubtotal, discountAmount, taxAmount, shippingFee, cartTotal,
        isCheckoutOpen, setIsCheckoutOpen,
        orders, createOrder, updateOrderStatus,
        trackingOrder, setTrackingOrder,
        isOrderHistoryOpen, setIsOrderHistoryOpen,
        reviews, addReview, getProductReviews,
        discounts, analytics
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};
