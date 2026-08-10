import { Category, Product, Review, DiscountCode, Order, User } from '../types/ecommerce';

export const DEMO_USERS: User[] = [
  {
    id: 'usr_customer_1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    joinedDate: '2025-01-15'
  },
  {
    id: 'usr_admin_1',
    name: 'Sarah Connor (Admin)',
    email: 'admin@aistudio-store.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    joinedDate: '2024-06-01'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat_electronics',
    name: 'Electronics & Gadgets',
    slug: 'electronics',
    description: 'Cutting-edge tech, smart devices, and daily gadgets.',
    iconName: 'Laptop',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    productCount: 8
  },
  {
    id: 'cat_audio',
    name: 'Audio & Sound',
    slug: 'audio',
    description: 'High-fidelity headphones, wireless earbuds, and spatial speakers.',
    iconName: 'Headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    productCount: 6
  },
  {
    id: 'cat_apparel',
    name: 'Modern Apparel',
    slug: 'apparel',
    description: 'Minimalist fashion, everyday comfort wear, and outerwear.',
    iconName: 'Shirt',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    productCount: 7
  },
  {
    id: 'cat_home',
    name: 'Home & Workspace',
    slug: 'home',
    description: 'Ergonomic furniture, desk setup accessories, and smart lighting.',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    productCount: 5
  },
  {
    id: 'cat_accessories',
    name: 'Wearables & Accessories',
    slug: 'accessories',
    description: 'Smartwatches, leather goods, and portable travel gear.',
    iconName: 'Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    productCount: 6
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: 'AeroPulse Spatial ANC Wireless Headphones',
    description: 'Experience studio-grade active noise cancellation with custom 40mm titanium drivers, 45-hour battery life, and ultra-comfortable memory foam ear cushions.',
    price: 299.99,
    originalPrice: 349.99,
    categoryId: 'cat_audio',
    categoryName: 'Audio & Sound',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 24,
    rating: 4.8,
    reviewCount: 142,
    tags: ['anc', 'wireless', 'premium', 'audio'],
    featured: true,
    isNew: true,
    createdAt: '2026-07-20',
    attributes: {
      colors: ['Space Gray', 'Matte Black', 'Silver Cloud'],
      brand: 'AeroSound',
      warranty: '2-Year International Warranty',
      material: 'Aircraft-grade Aluminum & Protein Leather'
    }
  },
  {
    id: 'prod_2',
    title: 'Horizon Minimalist Mechanical Keyboard',
    description: 'Custom hot-swappable mechanical keyboard featuring CNC aluminum chassis, pre-lubed linear switches, custom RGB backlight, and dual wireless/USB-C connection.',
    price: 159.50,
    originalPrice: 189.99,
    categoryId: 'cat_electronics',
    categoryName: 'Electronics & Gadgets',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 18,
    rating: 4.9,
    reviewCount: 88,
    tags: ['keyboard', 'desk setup', 'mechanical', 'rgb'],
    featured: true,
    isNew: false,
    createdAt: '2026-06-12',
    attributes: {
      colors: ['Midnight Dark', 'Arctic White'],
      sizes: ['Compact 75%', 'Full 100%'],
      brand: 'HorizonKey',
      warranty: '1-Year Limited Warranty'
    }
  },
  {
    id: 'prod_3',
    title: 'UrbanTech Waterproof Commuter Backpack',
    description: '30L water-resistant ballistic nylon laptop pack with magnetic fidlock buckles, hidden RFID anti-theft pocket, and ergonomic chest strap.',
    price: 119.00,
    originalPrice: 140.00,
    categoryId: 'cat_accessories',
    categoryName: 'Wearables & Accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 35,
    rating: 4.7,
    reviewCount: 64,
    tags: ['backpack', 'travel', 'waterproof', 'laptop bag'],
    featured: false,
    isNew: true,
    createdAt: '2026-07-28',
    attributes: {
      colors: ['Obsidian Black', 'Charcoal Gray', 'Olive Green'],
      sizes: ['20L Compact', '30L Travel'],
      brand: 'UrbanGear'
    }
  },
  {
    id: 'prod_4',
    title: 'ChronoFit Pro Smartwatch & Fitness Tracker',
    description: 'Always-on AMOLED display smartwatch with heart rate monitoring, continuous SpO2 sensor, built-in GPS, 5ATM water resistance, and 12-day battery.',
    price: 219.99,
    originalPrice: 249.99,
    categoryId: 'cat_accessories',
    categoryName: 'Wearables & Accessories',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 12,
    rating: 4.6,
    reviewCount: 110,
    tags: ['smartwatch', 'fitness', 'gps', 'wearable'],
    featured: true,
    isNew: false,
    createdAt: '2026-05-18',
    attributes: {
      colors: ['Titanium Gray', 'Rose Gold', 'Matte Black'],
      brand: 'ChronoFit'
    }
  },
  {
    id: 'prod_5',
    title: 'Organic Heavyweight Cotton Crewneck Sweatshirt',
    description: '450gsm 100% organic combed cotton hoodie with pre-shrunk fleece interior, dropped shoulder fit, and reinforced ribbed cuffs.',
    price: 78.00,
    originalPrice: 95.00,
    categoryId: 'cat_apparel',
    categoryName: 'Modern Apparel',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 50,
    rating: 4.9,
    reviewCount: 95,
    tags: ['apparel', 'cotton', 'sweatshirt', 'minimalist'],
    featured: false,
    isNew: true,
    createdAt: '2026-08-01',
    attributes: {
      colors: ['Oatmeal Cream', 'Deep Slate', 'Earthy Taupe'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      brand: 'ThreadCraft'
    }
  },
  {
    id: 'prod_6',
    title: 'LuminaDesk Smart Ambient Light Bar',
    description: 'Monitor-mounted LED light bar with auto-dimming ambient light sensor, non-glare optical geometry, customizable color temperature (2700K-6500K), and touch controls.',
    price: 89.99,
    originalPrice: 109.99,
    categoryId: 'cat_home',
    categoryName: 'Home & Workspace',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 4, // low stock alert demo!
    rating: 4.8,
    reviewCount: 73,
    tags: ['desk light', 'monitor lamp', 'workspace', 'home office'],
    featured: true,
    isNew: false,
    createdAt: '2026-04-10',
    attributes: {
      colors: ['Space Gray', 'Silver'],
      brand: 'LuminaHome'
    }
  },
  {
    id: 'prod_7',
    title: 'SonicMini Hi-Res Portable Bluetooth Speaker',
    description: 'IPX7 waterproof 30W portable speaker with dual passive radiators, 360-degree sound dispersion, stereo pairing, and 20-hour playback.',
    price: 85.00,
    originalPrice: 99.99,
    categoryId: 'cat_audio',
    categoryName: 'Audio & Sound',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 28,
    rating: 4.5,
    reviewCount: 52,
    tags: ['speaker', 'bluetooth', 'waterproof', 'outdoor'],
    featured: false,
    isNew: false,
    createdAt: '2026-03-22',
    attributes: {
      colors: ['Cobalt Blue', 'Matte Black', 'Crimson Red'],
      brand: 'AeroSound'
    }
  },
  {
    id: 'prod_8',
    title: 'ErgoPro Adjustable Felt & Walnut Laptop Stand',
    description: 'Sustainable solid American walnut and premium acoustic felt laptop riser. Elevates screen to eye level for optimal posture and heat dissipation.',
    price: 65.00,
    originalPrice: 75.00,
    categoryId: 'cat_home',
    categoryName: 'Home & Workspace',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 19,
    rating: 4.9,
    reviewCount: 118,
    tags: ['laptop stand', 'wood', 'ergonomic', 'workspace'],
    featured: false,
    isNew: false,
    createdAt: '2026-02-14',
    attributes: {
      colors: ['Walnut Wood', 'Oak Wood'],
      brand: 'CraftDesk'
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    productId: 'prod_1',
    userId: 'usr_customer_1',
    userName: 'Alex Morgan',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    rating: 5,
    comment: 'The noise cancellation on these headphones is insane! Took them on a 10-hour flight and my ears felt zero fatigue. Audio soundstage is wide and crisp.',
    createdAt: '2026-08-02',
    verifiedPurchase: true
  },
  {
    id: 'rev_2',
    productId: 'prod_1',
    userId: 'usr_buyer_2',
    userName: 'David Miller',
    rating: 5,
    comment: 'Battery life easily lasts a full work week. Bluetooth connection with my laptop and phone is instantaneous.',
    createdAt: '2026-07-28',
    verifiedPurchase: true
  },
  {
    id: 'rev_3',
    productId: 'prod_2',
    userId: 'usr_buyer_3',
    userName: 'Elena Rostova',
    rating: 5,
    comment: 'The tactile key feel and acoustics are unmatched right out of the box. Highly recommend the linear switches for daily coding!',
    createdAt: '2026-07-15',
    verifiedPurchase: true
  }
];

export const INITIAL_DISCOUNTS: DiscountCode[] = [
  {
    code: 'SAVE10',
    discountPercent: 10,
    minSpend: 50,
    active: true,
    description: 'Take 10% off any order over $50'
  },
  {
    code: 'WELCOME20',
    discountPercent: 20,
    minSpend: 100,
    active: true,
    description: '20% off welcome gift for orders over $100'
  },
  {
    code: 'FREESHIP',
    discountPercent: 100, // free shipping
    minSpend: 0,
    active: true,
    description: 'Free standard shipping on all items'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-8921',
    userId: 'usr_customer_1',
    userName: 'Alex Morgan',
    userEmail: 'alex.morgan@example.com',
    items: [
      {
        id: 'cart_item_1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Space Gray'
      },
      {
        id: 'cart_item_2',
        product: INITIAL_PRODUCTS[4],
        quantity: 2,
        selectedColor: 'Deep Slate',
        selectedSize: 'L'
      }
    ],
    subtotal: 455.99,
    discountAmount: 45.60,
    discountCodeApplied: 'SAVE10',
    tax: 32.83,
    shippingFee: 0, // free over threshold
    totalAmount: 443.22,
    shippingAddress: {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 234-5678',
      street: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'United States'
    },
    paymentMethod: 'Credit Card (Visa ending 4242)',
    status: 'shipped',
    trackingNumber: 'TRK-994827104US',
    carrier: 'FedEx Express',
    estimatedDelivery: '2026-08-08',
    createdAt: '2026-08-04T14:22:00Z',
    history: [
      { status: 'pending', timestamp: '2026-08-04T14:22:00Z', note: 'Order placed by customer.' },
      { status: 'payment_confirmed', timestamp: '2026-08-04T14:23:15Z', note: 'Payment processed via Stripe.' },
      { status: 'processing', timestamp: '2026-08-04T16:00:00Z', note: 'Order sent to warehouse fulfillment.' },
      { status: 'shipped', timestamp: '2026-08-05T09:30:00Z', note: 'Package handed to FedEx Express.' }
    ]
  },
  {
    id: 'ORD-2026-8804',
    userId: 'usr_customer_2',
    userName: 'Liam Vance',
    userEmail: 'liam.vance@gmail.com',
    items: [
      {
        id: 'cart_item_3',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedColor: 'Midnight Dark'
      }
    ],
    subtotal: 159.50,
    discountAmount: 0,
    tax: 12.76,
    shippingFee: 4.99,
    totalAmount: 177.25,
    shippingAddress: {
      fullName: 'Liam Vance',
      email: 'liam.vance@gmail.com',
      phone: '+1 (555) 876-5432',
      street: '100 Tech Blvd, Suite 400',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'United States'
    },
    paymentMethod: 'Apple Pay',
    status: 'delivered',
    trackingNumber: 'TRK-882104928US',
    carrier: 'UPS Ground',
    estimatedDelivery: '2026-08-03',
    createdAt: '2026-07-31T10:15:00Z',
    history: [
      { status: 'pending', timestamp: '2026-07-31T10:15:00Z', note: 'Order created.' },
      { status: 'payment_confirmed', timestamp: '2026-07-31T10:15:30Z', note: 'Apple Pay token authorized.' },
      { status: 'processing', timestamp: '2026-07-31T11:00:00Z', note: 'In packing queue.' },
      { status: 'shipped', timestamp: '2026-08-01T08:00:00Z', note: 'Shipped via UPS.' },
      { status: 'delivered', timestamp: '2026-08-03T14:45:00Z', note: 'Delivered at front door.' }
    ]
  }
];
