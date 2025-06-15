import productos from '../data/productos.js';

// Obtener todos los productos
const getAll = () => productos;

// Obtener productos filtrados por categoría
const getByCategoria = (categoria) =>
  productos.filter(p => p.categoria === categoria);

export default {
  getAll,
  getByCategoria
};
