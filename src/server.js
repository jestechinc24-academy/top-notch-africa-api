'use strict';

require('dotenv').config();
const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection established.');

    app.listen(PORT, () => {
      console.log(`Top Notch Africa API server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  }
}

start();
