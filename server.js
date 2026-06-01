require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const productRoutes = require('./src/routes/products.routes');
const { pool, testConnection } = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/test-db', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ message: 'Conexión exitosa a MySQL' });
  } catch (err) {
    next(err);
  }
});

app.use('/api/products', productRoutes);

app.use(errorHandler);

testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`\x1b[36mServidor corriendo en http://localhost:${PORT}\x1b[0m`);
  });
});
