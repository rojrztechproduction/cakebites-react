import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool, { testDbConnection } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - allow frontend (Vercel URL in production, localhost in dev)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true
}));

app.use(express.json());

// =============================================
// ROUTES
// =============================================

// 1. Health check & DB status
app.get('/api/health', async (req, res) => {
  const check = await testDbConnection();
  if (!check.ok) {
    return res.status(500).json({ status: 'error', message: check.message });
  }

  try {
    const [[{ prodCount }]] = await pool.query('SELECT COUNT(*) as prodCount FROM products WHERE is_active = 1');
    const [[{ catCount }]] = await pool.query('SELECT COUNT(*) as catCount FROM categories');
    const [[{ orderCount }]] = await pool.query('SELECT COUNT(*) as orderCount FROM orders');
    const [[{ areaCount }]] = await pool.query('SELECT COUNT(*) as areaCount FROM delivery_areas WHERE is_active = 1');

    res.json({
      status: 'connected',
      database: process.env.DB_NAME || 'cakebite_react',
      counts: {
        categories: catCount,
        products: prodCount,
        orders: orderCount,
        areas: areaCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 2. Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY sort_order ASC, id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get all delivery areas
app.get('/api/areas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM delivery_areas WHERE is_active = 1 ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get all products with category info
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug, c.banner_url as category_banner
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
      ORDER BY c.sort_order ASC, p.sort_order ASC, p.id ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get sections formatted for the CakeBites React UI
app.get('/api/sections', async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories ORDER BY sort_order ASC, id ASC');
    const [products] = await pool.query('SELECT * FROM products WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');

    const sections = categories.map((cat) => {
      const catProducts = products
        .filter((p) => p.category_id === cat.id)
        .map((p) => {
          return [
            p.name,
            Number(p.price),
            p.original_price ? Number(p.original_price) : null,
            p.image_url || null,
            p.badge || null,
            p.id
          ];
        });

      return {
        id: cat.slug,
        title: cat.name,
        banner: cat.banner_url,
        category: cat.name,
        products: catProducts
      };
    });

    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Place a new order
app.post('/api/orders', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      customer_name,
      customer_phone,
      delivery_area,
      delivery_address,
      notes = '',
      items = [],
      subtotal = 0,
      delivery_fee = 0,
      total_amount = 0
    } = req.body;

    if (!customer_name || !customer_phone || !items.length) {
      await connection.rollback();
      return res.status(400).json({ error: 'Customer name, phone, and at least 1 item are required' });
    }

    // Generate readable order code like CB-1042
    const [[maxRow]] = await connection.query('SELECT MAX(id) as maxId FROM orders');
    const nextNum = (maxRow?.maxId || 1000) + 1;
    const order_code = `CB-${nextNum}`;

    const [orderResult] = await connection.query(`
      INSERT INTO orders 
      (order_code, customer_name, customer_phone, delivery_area, delivery_address, notes, subtotal, delivery_fee, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `, [
      order_code,
      customer_name,
      customer_phone,
      delivery_area || 'Karachi',
      delivery_address || 'To be confirmed on call',
      notes,
      subtotal,
      delivery_fee,
      total_amount
    ]);

    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await connection.query(`
        INSERT INTO order_items (order_id, product_id, product_name, price, quantity, subtotal)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        orderId,
        item.productId || null,
        item.name,
        item.price,
        item.qty || 1,
        (item.price * (item.qty || 1))
      ]);
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: {
        id: orderId,
        order_code,
        customer_name,
        customer_phone,
        total_amount,
        status: 'pending'
      }
    });
  } catch (err) {
    await connection.rollback();
    console.error('Order creation error:', err);
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

// 7. Get all orders with items
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY id DESC LIMIT 50');
    const [items] = await pool.query('SELECT * FROM order_items WHERE order_id IN (?)', [
      orders.length ? orders.map((o) => o.id) : [0]
    ]);

    const enriched = orders.map((order) => ({
      ...order,
      items: items.filter((it) => it.order_id === order.id)
    }));

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Add a new product
app.post('/api/products', async (req, res) => {
  try {
    const { category_id, name, price, original_price, badge, description } = req.body;
    if (!category_id || !name || !price) {
      return res.status(400).json({ error: 'category_id, name, and price are required' });
    }

    const [result] = await pool.query(`
      INSERT INTO products (category_id, name, price, original_price, badge, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [category_id, name, price, original_price || null, badge || null, description || null]);

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      productId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, price, original_price, is_active } = req.body;
    const { id } = req.params;

    await pool.query(`
      UPDATE products 
      SET name = COALESCE(?, name),
          price = COALESCE(?, price),
          original_price = ?,
          is_active = COALESCE(?, is_active)
      WHERE id = ?
    `, [name, price, original_price, is_active, id]);

    res.json({ success: true, message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =============================================
// START SERVER
// =============================================
app.listen(PORT, () => {
  console.log(`🎂 CakeBites API Server running on http://localhost:${PORT}`);
  console.log(`📦 Database: ${process.env.DB_NAME || 'cakebite_react'} on ${process.env.DB_HOST || 'localhost'}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
});
