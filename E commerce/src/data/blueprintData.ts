export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  filename: string;
  code: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  summary: string;
  tasks: { task: string; details: string; status: 'completed' | 'in_progress' | 'pending' }[];
}

export interface TechStackItem {
  layer: string;
  recommended: string;
  iconName: string;
  reason: string;
  alternatives: string[];
}

export const TECH_STACK_RECOMMENDATIONS: TechStackItem[] = [
  {
    layer: 'Frontend Framework',
    recommended: 'Next.js 15 (App Router, React 19)',
    iconName: 'Layout',
    reason: 'Provides server-side rendering (SSR), static site generation (SSG) for SEO-rich product pages, server components, and streaming for fast initial page load.',
    alternatives: ['Vite + React (SPA)', 'Remix / React Router 7', 'Astro (SSG)']
  },
  {
    layer: 'Styling & Design System',
    recommended: 'Tailwind CSS v4 + Shadcn UI + Lucide Icons',
    iconName: 'Palette',
    reason: 'Utility-first CSS paired with accessible, unstyled Radix primitives. Allows building bespoke, accessible e-commerce UIs without heavy runtime overhead.',
    alternatives: ['Chakra UI', 'MUI', 'CSS Modules / Styled Components']
  },
  {
    layer: 'Database & ORM',
    recommended: 'PostgreSQL + Prisma ORM / Drizzle ORM',
    iconName: 'Database',
    reason: 'Relational integrity is crucial for e-commerce orders, inventory atomicity, and multi-table transactions. Prisma or Drizzle provide full type-safe database queries.',
    alternatives: ['MongoDB + Mongoose (Document)', 'Supabase (Managed Postgres)', 'PlanetScale (MySQL)']
  },
  {
    layer: 'State Management',
    recommended: 'Zustand + React Context + TanStack Query',
    iconName: 'Cpu',
    reason: 'Zustand offers tiny, lightweight persistent client cart state without boilerplate. TanStack Query handles server state caching, pagination, and optimistic updates.',
    alternatives: ['Redux Toolkit', 'Jotai', 'Pinia (Vue)']
  },
  {
    layer: 'Payment & Checkout',
    recommended: 'Stripe API (PaymentIntents & Webhooks)',
    iconName: 'CreditCard',
    reason: 'Gold standard for online payments, Apple Pay / Google Pay support, PCI compliance out-of-the-box, and robust webhooks for asynchronous order processing.',
    alternatives: ['Razorpay (India focus)', 'PayPal Commerce Platform', 'LemonSqueezy']
  },
  {
    layer: 'Authentication & Roles',
    recommended: 'Clerk / NextAuth.js (Auth.js) / Firebase Auth',
    iconName: 'ShieldCheck',
    reason: 'Handles social logins, guest checkouts, session JWT persistence, passwordless magic links, and role-based middleware access control (Admin vs Customer).',
    alternatives: ['Lucia Auth', 'Supabase Auth', 'Custom JWT + Express']
  },
  {
    layer: 'Image & Asset Hosting',
    recommended: 'Cloudinary / Uploadthing / AWS S3',
    iconName: 'Image',
    reason: 'E-commerce requires responsive image delivery, automatic WebP/AVIF format optimization, crop presets, and high availability CDN distribution.',
    alternatives: ['Vercel Blob', 'Firebase Storage', 'Cloudflare R2']
  },
  {
    layer: 'Hosting & CI/CD',
    recommended: 'Vercel / AWS Cloud Run / Netlify',
    iconName: 'Server',
    reason: 'Zero-config serverless deployment with automated preview environments for PRs, edge caching, and seamless Next.js optimization.',
    alternatives: ['AWS Amplify', 'Render', 'DigitalOcean App Platform']
  }
];

export const PROJECT_DIRECTORY_STRUCTURE = `
my-ecommerce-app/
├── prisma/
│   ├── schema.prisma            # Database models & relationships
│   └── seed.ts                  # Database seeder script
├── src/
│   ├── app/                     # Next.js App Router Pages & API
│   │   ├── (storefront)/        # Customer Store routes
│   │   │   ├── page.tsx         # Storefront Homepage
│   │   │   ├── products/
│   │   │   │   ├── page.tsx     # Products Catalog & Filters
│   │   │   │   └── [id]/page.tsx# Product Detail Page
│   │   │   ├── cart/page.tsx    # Shopping Cart
│   │   │   ├── checkout/page.tsx# Payment & Shipping Checkout
│   │   │   └── orders/[id]/page.tsx # Order Status & Tracker
│   │   ├── (admin)/             # Protected Admin Portal
│   │   │   └── admin/
│   │   │       ├── dashboard/page.tsx # Sales Analytics Summary
│   │   │       ├── products/page.tsx  # Product CRUD & Inventory
│   │   │       └── orders/page.tsx    # Order Status Processing
│   │   └── api/                 # Backend API Endpoints
│   │       ├── checkout/route.ts# Stripe PaymentIntent Creation
│   │       ├── webhooks/stripe/route.ts # Payment Webhook Handler
│   │       └── products/route.ts# Product Search & Management
│   ├── components/
│   │   ├── ui/                  # Reusable UI Primitives (Button, Modal, Input)
│   │   ├── store/               # Storefront Components (Cart, Cards, Filters)
│   │   └── admin/               # Admin Tables, Charts & Forms
│   ├── context/
│   │   └── cart-store.ts        # Zustand Cart State Engine & LocalStorage
│   ├── lib/
│   │   ├── prisma.ts            # Prisma Database Client instance
│   │   ├── stripe.ts            # Stripe SDK initialization
│   │   └── auth.ts              # Session & Role Verification helpers
│   └── types/                   # Shared TypeScript Interfaces
├── .env.example                 # Environment Credentials Template
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS theme extension
└── package.json                 # Project dependencies & scripts
`.trim();

export const POSTGRES_SQL_SCHEMA = `
-- PostgreSQL DDL Script for E-Commerce Schema

-- 1. Users Table
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'guest')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories Table
CREATE TABLE categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT
);

-- 3. Products Table
CREATE TABLE products (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category_id VARCHAR(36) REFERENCES categories(id) ON DELETE SET NULL,
  stock INT NOT NULL DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.0,
  review_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Product Images
CREATE TABLE product_images (
  id VARCHAR(36) PRIMARY KEY,
  product_id VARCHAR(36) REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0
);

-- 5. Orders Table
CREATE TABLE orders (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'payment_confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled')),
  subtotal DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0.0,
  tax DECIMAL(10, 2) NOT NULL,
  shipping_fee DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  stripe_payment_intent_id VARCHAR(255),
  tracking_number VARCHAR(100),
  carrier VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Order Items Table
CREATE TABLE order_items (
  id VARCHAR(36) PRIMARY KEY,
  order_id VARCHAR(36) REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(36) REFERENCES products(id) ON DELETE SET NULL,
  product_title VARCHAR(255) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  selected_color VARCHAR(50),
  selected_size VARCHAR(50)
);

-- 7. Reviews Table
CREATE TABLE reviews (
  id VARCHAR(36) PRIMARY KEY,
  product_id VARCHAR(36) REFERENCES products(id) ON DELETE CASCADE,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`.trim();

export const PRISMA_SCHEMA_CODE = `
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  CUSTOMER
  ADMIN
  GUEST
}

enum OrderStatus {
  PENDING
  PAYMENT_CONFIRMED
  PROCESSING
  SHIPPED
  OUT_FOR_DELIVERY
  DELIVERED
  CANCELLED
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  role      Role     @default(CUSTOMER)
  avatarUrl String?
  orders    Order[]
  reviews   Review[]
  createdAt DateTime @default(now())
}

model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  imageUrl    String?
  products    Product[]
}

model Product {
  id            String         @id @default(cuid())
  title         String
  description   String
  price         Float
  originalPrice Float?
  categoryId    String?
  category      Category?      @relation(fields: [categoryId], references: [id])
  stock         Int            @default(0)
  rating        Float          @default(0.0)
  reviewCount   Int            @default(0)
  featured      Boolean        @default(false)
  images        ProductImage[]
  orderItems    OrderItem[]
  reviews       Review[]
  createdAt     DateTime       @default(now())
}

model ProductImage {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
}

model Order {
  id                   String      @id @default(cuid())
  userId               String?
  user                 User?       @relation(fields: [userId], references: [id])
  status               OrderStatus @default(PENDING)
  subtotal             Float
  discountAmount       Float       @default(0.0)
  tax                  Float
  shippingFee          Float
  totalAmount          Float
  shippingAddress      Json
  paymentMethod        String
  stripePaymentIntent  String?
  trackingNumber       String?
  carrier              String?
  items                OrderItem[]
  createdAt            DateTime    @default(now())
}

model OrderItem {
  id            String  @id @default(cuid())
  orderId       String
  order         Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId     String?
  product       Product?@relation(fields: [productId], references: [id])
  productTitle  String
  unitPrice     Float
  quantity      Int
  selectedColor String?
  selectedSize  String?
}

model Review {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  rating    Int
  comment   String
  createdAt DateTime @default(now())
}
`.trim();

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'snip_prisma',
    title: 'Prisma ORM Database Schema',
    description: 'Relational data modeling for Users, Products, Categories, Orders, OrderItems, and Product Reviews.',
    language: 'prisma',
    filename: 'prisma/schema.prisma',
    code: PRISMA_SCHEMA_CODE
  },
  {
    id: 'snip_cart_state',
    title: 'Persistent Shopping Cart Engine (Zustand)',
    description: 'Client-side state management with automatic LocalStorage sync, quantity updates, and discount calculations.',
    language: 'typescript',
    filename: 'src/context/cart-store.ts',
    code: `
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, DiscountCode } from '@/types/ecommerce';

interface CartStore {
  items: CartItem[];
  discount: DiscountCode | null;
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  applyDiscount: (code: DiscountCode) => void;
  removeDiscount: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTaxAmount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      discount: null,

      addItem: (product, quantity = 1, color, size) => {
        const cartItemId = \`\${product.id}-\${color || 'default'}-\${size || 'default'}\`;
        const existingItem = get().items.find(i => i.id === cartItemId);

        if (existingItem) {
          set({
            items: get().items.map(item =>
              item.id === cartItemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...get().items, { id: cartItemId, product, quantity, selectedColor: color, selectedSize: size }]
          });
        }
      },

      removeItem: (cartItemId) => {
        set({ items: get().items.filter(item => item.id !== cartItemId) });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.id === cartItemId ? { ...item, quantity } : item
          )
        });
      },

      applyDiscount: (code) => set({ discount: code }),
      removeDiscount: () => set({ discount: null }),
      clearCart: () => set({ items: [], discount: null }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discount;
        if (!discount || subtotal < (discount.minSpend || 0)) return 0;
        return (subtotal * discount.discountPercent) / 100;
      },

      getTaxAmount: () => {
        const netSubtotal = get().getSubtotal() - get().getDiscountAmount();
        return Math.max(0, netSubtotal * 0.08); // 8% sales tax
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const tax = get().getTaxAmount();
        const shipping = subtotal > 100 || subtotal === 0 ? 0 : 4.99;
        return Math.max(0, subtotal - discount + tax + shipping);
      }
    }),
    { name: 'shopping-cart-storage' }
  )
);
`.trim()
  },
  {
    id: 'snip_stripe',
    title: 'Stripe Payment Processing API Route',
    description: 'Next.js App Router server endpoint to create Stripe Payment Intents with calculated server-authoritative totals.',
    language: 'typescript',
    filename: 'src/app/api/checkout/route.ts',
    code: `
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const { items, shippingAddress, discountCode } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // 1. Calculate server-authoritative total to prevent client tampering
    let subtotal = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });
      if (!product || product.stock < item.quantity) {
        return NextResponse.json({ error: \`Product \${item.productId} out of stock\` }, { status: 400 });
      }
      subtotal += product.price * item.quantity;
    }

    // 2. Apply discount if valid
    let discountAmount = 0;
    if (discountCode === 'SAVE10') discountAmount = subtotal * 0.10;

    const tax = (subtotal - discountAmount) * 0.08;
    const shipping = subtotal > 100 ? 0 : 4.99;
    const totalInCents = Math.round((subtotal - discountAmount + tax + shipping) * 100);

    // 3. Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalInCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerEmail: shippingAddress.email,
        itemCount: items.length
      }
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: totalInCents / 100
    });
  } catch (error: any) {
    console.error('Stripe Payment Intent Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
`.trim()
  },
  {
    id: 'snip_auth_middleware',
    title: 'Role-Based Access Control Middleware',
    description: 'Secures `/admin/*` routes to allow only authorized admin users while letting customers access storefront routes.',
    language: 'typescript',
    filename: 'src/middleware.ts',
    code: `
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Protect Admin Dashboard Routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login?callbackUrl=' + pathname, req.url));
    }

    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/checkout', '/orders/:path*']
};
`.trim()
  }
];

export const STEP_BY_STEP_ROADMAP: RoadmapPhase[] = [
  {
    phase: 1,
    title: 'Project Setup & Core Architecture',
    duration: 'Day 1 - 2',
    summary: 'Initialize Next.js project, setup Tailwind CSS v4, install icons, and configure environment credentials.',
    tasks: [
      { task: 'Initialize Next.js 15 App Router codebase', details: 'npx create-next-app@latest --ts --tailwind --app', status: 'completed' },
      { task: 'Install UI & Animation packages', details: 'npm install lucide-react motion canvas-confetti zustand', status: 'completed' },
      { task: 'Configure .env.example', details: 'Setup DATABASE_URL, STRIPE_SECRET_KEY, NEXTAUTH_SECRET, CLOUDINARY_URL', status: 'completed' }
    ]
  },
  {
    phase: 2,
    title: 'Database & Data Modeling',
    duration: 'Day 3 - 4',
    summary: 'Establish relational schemas with Prisma or Drizzle ORM, create migration files, and seed initial product catalog.',
    tasks: [
      { task: 'Define Prisma Data Schema', details: 'Users, Products, Categories, Orders, OrderItems, Reviews', status: 'completed' },
      { task: 'Execute Prisma Migration', details: 'npx prisma migrate dev --name init', status: 'completed' },
      { task: 'Create Seed Script', details: 'Seed categories, realistic products, stock levels, and demo reviews', status: 'completed' }
    ]
  },
  {
    phase: 3,
    title: 'Authentication & Role Security',
    duration: 'Day 5 - 6',
    summary: 'Implement NextAuth / Clerk authentication with email/password, social logins, guest checkout tokens, and admin middleware.',
    tasks: [
      { task: 'Integrate Auth Provider', details: 'Setup session providers, login forms, and register API endpoint', status: 'completed' },
      { task: 'Implement Role-Based Access Control', details: 'Enforce ADMIN vs CUSTOMER roles in middleware and Server Actions', status: 'completed' },
      { task: 'Enable Guest Checkout', details: 'Allow unauthenticated users to create order with guest email token', status: 'completed' }
    ]
  },
  {
    phase: 4,
    title: 'Storefront & Interactive Catalog',
    duration: 'Day 7 - 10',
    summary: 'Build high-converting storefront UI with faceted filtering, multi-attribute search, product details, and persistent cart.',
    tasks: [
      { task: 'Build Product Catalog Grid', details: 'Category pills, price slider, minimum rating filter, search bar', status: 'completed' },
      { task: 'Develop Product Detail Modal/Page', details: 'Image gallery, size/color variant selection, stock alerts, reviews', status: 'completed' },
      { task: 'Implement Persistent Cart Drawer', details: 'Zustand state engine, item qty controls, promo code discount logic', status: 'completed' }
    ]
  },
  {
    phase: 5,
    title: 'Payment Gateway & Order Engine',
    duration: 'Day 11 - 13',
    summary: 'Connect Stripe PaymentIntents API, handle secure server total recalculation, process webhooks, and trigger order receipts.',
    tasks: [
      { task: 'Stripe API Route Integration', details: 'POST /api/checkout to create PaymentIntent with server totals', status: 'completed' },
      { task: 'Checkout UI Form', details: 'Shipping address input, payment method selection, instant validation', status: 'completed' },
      { task: 'Order Tracking System', details: 'Visual status timeline (Pending -> Shipped -> Delivered) with tracking IDs', status: 'completed' }
    ]
  },
  {
    phase: 6,
    title: 'Admin Dashboard & Production Deployment',
    duration: 'Day 14 - 15',
    summary: 'Build back-office management portal for CRUD operations, stock management, analytics charts, and deploy to Vercel.',
    tasks: [
      { task: 'Admin Analytics Overview', details: 'Revenue cards, monthly sales charts, category breakdown graphs', status: 'completed' },
      { task: 'Product Management CRUD', details: 'Add/Edit/Delete products, stock inventory quick-update', status: 'completed' },
      { task: 'Order Processing Panel', details: 'Update order statuses in real-time and print customer packing slips', status: 'completed' },
      { task: 'Vercel / Cloud Run Deployment', details: 'Configure production Postgres DB on Supabase/Cloud SQL and deploy', status: 'completed' }
    ]
  }
];
