import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productosRoutes from './routes/productosRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import Orden from './models/ordenModel.js';

const app = express();
const PORT = 3001;

// Conexión a MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar con MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);

// Simulación de base de datos de órdenes en memoria
let ordenes = [];

app.post('/api/orden', authMiddleware, async (req, res) => {
  try {
    const nuevaOrden = new Orden({
      productos: req.body.productos,
      usuario: req.usuario.email
    });

    await nuevaOrden.save();

    res.status(201).json({ mensaje: 'Orden creada', orden: nuevaOrden });
  } catch (error) {
    console.error('Error al guardar orden:', error);
    res.status(500).json({ mensaje: 'Error al guardar la orden' });
  }
});




// Ruta protegida para registrar órdenes 
/*app.post('/api/orden', authMiddleware, (req, res) => {
  const nuevaOrden = {
    id: ordenes.length + 1,
    productos: req.body.productos,
    fecha: new Date().toISOString(),
    usuario: req.usuario.email
  };

  console.log('🛒 Orden recibida:', nuevaOrden);
  ordenes.push(nuevaOrden);
  res.status(201).json({ mensaje: 'Orden creada', orden: nuevaOrden });
});
*/
// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend activo en http://localhost:${PORT}`);
});