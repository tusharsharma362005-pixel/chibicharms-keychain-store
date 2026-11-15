# ChibiCharms ✨ Adorable Custom Keychain E-Commerce Website & Backend

A cute, modern, visually attractive full-stack e-commerce web application for a kawaii keychain brand. Customers can browse ready-made keychains, build custom keychains with live interactive previews, place orders at checkout, and store owners can view and manage orders through an integrated Admin Dashboard.

---

## 🏗️ Architecture Overview

- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Canvas Confetti, Hash-based Multi-Page SPA Router.
- **Backend**: Node.js & Express API server (`server/index.js`).
- **Database**: Native SQLite database (`node:sqlite` in `chibicharms.db`) with zero external C++ build dependencies.
- **Dev Server**: Vite with automatic API proxy (`/api` -> `http://localhost:5000`).

---

## 🎀 Pages & Routes

1. **Home (`#/`)**:
   - Headline: **“Carry a Little Piece of You ✨”**
   - Tagline: **“Pick your favorite or create your own!”**
   - Two prominent action buttons: **Shop Keychains** and **Customize Yours**
   - Animated hero display featuring floating Mochi Boba Bear shaker keychain
   - Best Sellers and New Arrivals (fetched dynamically from the SQLite API)
   - Real customer reviews and quality guarantee perks
2. **Shop (`#/shop`)**:
   - Product catalog fetched from `GET /api/products`
   - Category filtering (*Cute Characters*, *Initial/Name*, *Anime-Inspired*, *Animals*, *Flowers*, *Couple/Friendship*, *Personalized*)
   - Real-time search, sorting, and "Customizable Only" filter
   - Product cards with price, ratings, Add to Cart, and Customize buttons
3. **Custom Keychain Studio (`#/customize`)**:
   - Real-time interactive keychain preview with live shape, color, finish, and font rendering
   - 9 base shapes, 8 pastel colors, 3 finish textures, custom name/initials engraving, 4 hardware clasp choices, and 8 dangling mini charms
   - Dynamic price calculation
   - **“Create My Keychain ✨”** button persists custom design to `/api/custom-keychains` and adds to cart
4. **Product Detail (`#/product/:id`)**:
   - Fetched via `GET /api/products/:id`
   - High-res interactive visual, color variant picker, clasp selector, quantity counter, and specifications
5. **Cart & Checkout (`#/cart`)**:
   - Shows detailed item specifications (for custom items: shape, color, finish, custom text, charms, gift box)
   - Free shipping progress bar ($35 threshold)
   - Promo coupon support (`CUTE10`, `SWEET15`)
   - Multi-step checkout modal: saves order to SQLite via `POST /api/orders` and celebrates with confetti
6. **Admin Orders Dashboard (`#/admin`)**:
   - Accessible from the top navigation bar or footer link
   - Real-time order metrics: Total Orders, Total Revenue, In Production count, Shipped count
   - Filter orders by status (*In Production*, *Ready to Ship*, *Shipped*, *Delivered*)
   - Live search by Order ID, Customer Name, or Email
   - Visual breakdown of keychains ordered (including custom inscriptions and colors)
   - Status updater dropdown (instantly updates SQLite database via `PATCH /api/orders/:id/status`)
   - Delete/archive order action (`DELETE /api/orders/:id`)
7. **New Arrivals (`#/new-arrivals`)** & **About Us (`#/about`)**

---

## 🗄️ SQLite Database Schema (`chibicharms.db`)

### 1. `products`
- `id` (TEXT PRIMARY KEY)
- `name` (TEXT)
- `category` (TEXT)
- `category_name` (TEXT)
- `price` (REAL)
- `original_price` (REAL)
- `rating` (REAL)
- `reviews_count` (INTEGER)
- `badge` (TEXT)
- `in_stock` (INTEGER)
- `customizable` (INTEGER)
- `tagline` (TEXT)
- `description` (TEXT)
- `materials` (TEXT)
- `dimensions` (TEXT)
- `colors` (TEXT - JSON array)
- `default_color` (TEXT)
- `image_type` (TEXT)
- `featured` (INTEGER)
- `is_new` (INTEGER)

### 2. `orders`
- `order_id` (TEXT PRIMARY KEY, e.g. `CC-839201`)
- `customer_name` (TEXT)
- `customer_email` (TEXT)
- `customer_address` (TEXT)
- `customer_city` (TEXT)
- `customer_state` (TEXT)
- `customer_zip` (TEXT)
- `payment_method` (TEXT)
- `subtotal` (REAL)
- `shipping` (REAL)
- `discount` (REAL)
- `total_price` (REAL)
- `status` (TEXT, default: `'In Production'`)
- `items` (TEXT - JSON array with full custom details & specs)
- `created_at` (DATETIME)

### 3. `custom_keychains`
- `id` (TEXT PRIMARY KEY)
- `shape` (TEXT)
- `shape_name` (TEXT)
- `color_name` (TEXT)
- `color_hex` (TEXT)
- `finish` (TEXT)
- `finish_name` (TEXT)
- `text` (TEXT)
- `font` (TEXT)
- `text_color` (TEXT)
- `hardware` (TEXT)
- `hardware_name` (TEXT)
- `charms` (TEXT - JSON array)
- `gift_box` (INTEGER)
- `total_price` (REAL)
- `created_at` (DATETIME)

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/products` | Fetch all products with filter/sort |
| `GET` | `/api/products/:id` | Fetch single product by id |
| `POST` | `/api/custom-keychains` | Save a custom keychain design |
| `GET` | `/api/custom-keychains` | Fetch saved custom keychains |
| `POST` | `/api/orders` | Create an order at checkout & save to SQLite |
| `GET` | `/api/orders` | Fetch orders for Admin dashboard |
| `PATCH` | `/api/orders/:id/status` | Update order status |
| `DELETE` | `/api/orders/:id` | Delete an order |
| `GET` | `/api/stats` | Fetch total revenue, orders, and queue stats |

---

## 🚀 Running Frontend and Backend Together

### 1. Start the Express Backend (Port 5000):
```bash
node server/index.js
# Or
npm run server
```

### 2. Start the Vite Frontend (Port 5173):
```bash
npm run dev
```

The Vite dev server automatically proxies all `/api/*` calls to `http://localhost:5000`.

- **Frontend Store**: [http://localhost:5173/](http://localhost:5173/)
- **Admin Orders View**: [http://localhost:5173/#/admin](http://localhost:5173/#/admin)
- **Backend API**: [http://localhost:5000/api/products](http://localhost:5000/api/products)
