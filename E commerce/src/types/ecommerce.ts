export type UserRole = 'customer' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedDate: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  productCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

export interface ProductAttributes {
  colors?: string[];
  sizes?: string[];
  brand?: string;
  warranty?: string;
  material?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  categoryName: string;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  createdAt: string;
  attributes?: ProductAttributes;
}

export interface CartItem {
  id: string; // unique cart item key (productId + size + color)
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface DiscountCode {
  code: string;
  discountPercent: number;
  minSpend?: number;
  active: boolean;
  description: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = 
  | 'pending'
  | 'payment_confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountCodeApplied?: string;
  tax: number;
  shippingFee: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: OrderStatus;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  createdAt: string;
  history: OrderStatusHistory[];
}

export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  monthlyRevenue: { month: string; sales: number; orders: number }[];
  categoryDistribution: { categoryName: string; percentage: number; revenue: number }[];
}
