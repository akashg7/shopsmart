const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Webhook feature removed
// const webhookRoutes = require('./routes/webhookRoutes');
// app.use('/api/webhooks', webhookRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static frontend in production (built by Dockerfile)
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Catch-all: serve React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;
