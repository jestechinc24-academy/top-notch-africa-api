'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes');

const app = express();


const allowedOrigins = [
  'http://localhost:3000',
  'https://top-notch-africa-web-black.vercel.app',
];


// middle ware to handle CORS
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // only needed if you're using cookies/sessions; harmless otherwise
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NDGP API' });
});

app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal server error',
  });
});

module.exports = app;