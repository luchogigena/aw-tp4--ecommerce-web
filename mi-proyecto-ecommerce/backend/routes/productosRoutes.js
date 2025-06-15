import express from 'express';
import obtenerProductos from '../controllers/productosController.js';
const router = express.Router();

// Ruta GET /api/productos
router.get('/', obtenerProductos);

export default router;