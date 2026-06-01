require('dotenv').config();
const express = require('express');
const cors = require('cors');

const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const productRoutes = require('./src/routes/products.routes');
const { pool, testConnection } = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Ruta principal
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ecommerce API funcionando correctamente'
  });
});

// Test de conexión
app.get('/test-db', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      success: true,
      message: 'Conexión exitosa a MySQL'
    });
  } catch (err) {
    next(err);
  }
});

// Rutas de productos
app.use('/api/products', productRoutes);

// Middleware de errores
app.use(errorHandler);

// Iniciar servidor
const startServer = async () => {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(
        `\x1b[36mServidor corriendo en puerto ${PORT}\x1b[0m`
      );
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

startServer();