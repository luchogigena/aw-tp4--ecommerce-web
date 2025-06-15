import mongoose from 'mongoose';

const ordenSchema = new mongoose.Schema({
  productos: [
    {
      id: Number,
      nombre: String,
      precio: Number
    }
  ],
  usuario: String,
  fecha: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Orden', ordenSchema);