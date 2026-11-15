import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { db, initDatabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database and tables
initDatabase();

// --- 1. HEALTH CHECK ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'ChibiCharms API', timestamp: new Date().toISOString() });
});

// --- 2. PRODUCTS API ---
// Fetch all products with optional category, search, and sort filters
app.get('/api/products', (req, res) => {
  try {
    const { category, search, sort, customizable } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (customizable === 'true' || customizable === '1') {
      query += ' AND customizable = 1';
    }

    if (search) {
      query += ' AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category_name) LIKE ?)';
      const term = `%${search.toLowerCase()}%`;
      params.push(term, term, term);
    }

    if (sort === 'price-low') {
      query += ' ORDER BY price ASC';
    } else if (sort === 'price-high') {
      query += ' ORDER BY price DESC';
    } else if (sort === 'rating') {
      query += ' ORDER BY rating DESC';
    } else if (sort === 'reviews') {
      query += ' ORDER BY reviews_count DESC';
    } else {
      query += ' ORDER BY featured DESC, id ASC';
    }

    const rows = db.prepare(query).all(...params);

    // Format products for frontend consumption
    const products = rows.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      categoryName: p.category_name,
      price: p.price,
      originalPrice: p.original_price,
      rating: p.rating,
      reviewsCount: p.reviews_count,
      badge: p.badge,
      inStock: Boolean(p.in_stock),
      customizable: Boolean(p.customizable),
      tagline: p.tagline,
      description: p.description,
      materials: p.materials,
      dimensions: p.dimensions,
      colors: p.colors ? JSON.parse(p.colors) : [],
      defaultColor: p.default_color,
      imageType: p.image_type,
      featured: Boolean(p.featured),
      isNew: Boolean(p.is_new)
    }));

    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Fetch single product by id
app.get('/api/products/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = {
      id: row.id,
      name: row.name,
      category: row.category,
      categoryName: row.category_name,
      price: row.price,
      originalPrice: row.original_price,
      rating: row.rating,
      reviewsCount: row.reviews_count,
      badge: row.badge,
      inStock: Boolean(row.in_stock),
      customizable: Boolean(row.customizable),
      tagline: row.tagline,
      description: row.description,
      materials: row.materials,
      dimensions: row.dimensions,
      colors: row.colors ? JSON.parse(row.colors) : [],
      defaultColor: row.default_color,
      imageType: row.image_type,
      featured: Boolean(row.featured),
      isNew: Boolean(row.is_new)
    };

    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// --- 3. CUSTOM KEYCHAINS API ---
// Save or register a custom keychain creation
app.post('/api/custom-keychains', (req, res) => {
  try {
    const {
      id = `custom-${Date.now()}`,
      shape,
      shapeName,
      colorName,
      colorHex,
      finish,
      finishName,
      text,
      font,
      textColor,
      hardware,
      hardwareName,
      charms = [],
      giftBox = false,
      totalPrice
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO custom_keychains (
        id, shape, shape_name, color_name, color_hex, finish, finish_name,
        text, font, text_color, hardware, hardware_name, charms, gift_box, total_price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      shape,
      shapeName || shape,
      colorName,
      colorHex,
      finish,
      finishName || finish,
      text || '',
      font || 'bubble',
      textColor || '#FFFFFF',
      hardware || 'gold-star',
      hardwareName || hardware,
      JSON.stringify(charms),
      giftBox ? 1 : 0,
      totalPrice || 14.99
    );

    res.status(201).json({ success: true, customKeychain: { id, ...req.body } });
  } catch (err) {
    console.error('Error creating custom keychain:', err);
    res.status(500).json({ error: 'Failed to save custom keychain' });
  }
});

// Fetch saved custom keychains (community creations / presets)
app.get('/api/custom-keychains', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM custom_keychains ORDER BY created_at DESC LIMIT 20').all();
    const creations = rows.map((r) => ({
      ...r,
      charms: r.charms ? JSON.parse(r.charms) : [],
      gift_box: Boolean(r.gift_box)
    }));
    res.json(creations);
  } catch (err) {
    console.error('Error fetching custom keychains:', err);
    res.status(500).json({ error: 'Failed to fetch custom keychains' });
  }
});

// --- 4. ORDERS & CHECKOUT API ---
// Create a new order at checkout
app.post('/api/orders', (req, res) => {
  try {
    const {
      orderId = `CC-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      customerEmail,
      customerAddress,
      customerCity,
      customerState,
      customerZip,
      paymentMethod = 'card',
      subtotal = 0,
      shipping = 0,
      discount = 0,
      totalPrice = 0,
      items = []
    } = req.body;

    if (!customerName || !customerEmail || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required customer details or empty cart items' });
    }

    const stmt = db.prepare(`
      INSERT INTO orders (
        order_id, customer_name, customer_email, customer_address, customer_city,
        customer_state, customer_zip, payment_method, subtotal, shipping,
        discount, total_price, status, items
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'In Production', ?
      )
    `);

    stmt.run(
      orderId,
      customerName,
      customerEmail,
      customerAddress || 'N/A',
      customerCity || 'N/A',
      customerState || 'N/A',
      customerZip || 'N/A',
      paymentMethod,
      subtotal,
      shipping,
      discount,
      totalPrice,
      JSON.stringify(items)
    );

    res.status(201).json({
      success: true,
      orderId,
      message: 'Order created successfully and placed in production queue!',
      order: {
        orderId,
        customerName,
        customerEmail,
        totalPrice,
        status: 'In Production',
        itemCount: items.length
      }
    });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Failed to save order in database' });
  }
});

// Fetch all orders for the Admin Orders View
app.get('/api/orders', (req, res) => {
  try {
    const { status, search } = req.query;
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (LOWER(order_id) LIKE ? OR LOWER(customer_name) LIKE ? OR LOWER(customer_email) LIKE ?)';
      const term = `%${search.toLowerCase()}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY created_at DESC';

    const rows = db.prepare(query).all(...params);

    const orders = rows.map((r) => ({
      orderId: r.order_id,
      customerName: r.customer_name,
      customerEmail: r.customer_email,
      customerAddress: r.customer_address,
      customerCity: r.customer_city,
      customerState: r.customer_state,
      customerZip: r.customer_zip,
      paymentMethod: r.payment_method,
      subtotal: r.subtotal,
      shipping: r.shipping,
      discount: r.discount,
      totalPrice: r.total_price,
      status: r.status,
      items: r.items ? JSON.parse(r.items) : [],
      createdAt: r.created_at
    }));

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status (Admin operation)
app.patch('/api/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const stmt = db.prepare('UPDATE orders SET status = ? WHERE order_id = ?');
    const result = stmt.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, orderId: id, newStatus: status });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Delete / Archive order (Admin operation)
app.delete('/api/orders/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM orders WHERE order_id = ?');
    const result = stmt.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, message: `Order ${req.params.id} removed.` });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// --- 5. ADMIN METRICS & DASHBOARD STATS ---
app.get('/api/stats', (req, res) => {
  try {
    const totalOrdersRow = db.prepare('SELECT COUNT(*) as count FROM orders').get();
    const totalRevenueRow = db.prepare('SELECT SUM(total_price) as sum FROM orders').get();
    const inProductionRow = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'In Production'").get();
    const shippedRow = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'Shipped'").get();
    const customKeychainsCountRow = db.prepare('SELECT COUNT(*) as count FROM custom_keychains').get();

    res.json({
      totalOrders: totalOrdersRow.count,
      totalRevenue: totalRevenueRow.sum || 0,
      inProduction: inProductionRow.count,
      shipped: shippedRow.count,
      customCraftsCreated: customKeychainsCountRow.count
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// --- 6. STATIC FILES & SPA FALLBACK FOR PRODUCTION ---
if (fs.existsSync(distPath)) {
  console.log(`📦 Serving static frontend files from: ${distPath}`);
  app.use(express.static(distPath));

  // SPA fallback for all non-API GET routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      next();
    }
  });
}

// Start Express Server
app.listen(PORT, () => {
  console.log(`🌸 ChibiCharms Express Backend running at http://localhost:${PORT}`);
  console.log(`✨ SQLite database ready at chibicharms.db`);
});
