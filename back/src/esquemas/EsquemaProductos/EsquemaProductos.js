const mongoose = require("mongoose");
const moment = require('moment-timezone');

const esquemaProductos = mongoose.Schema({
  estado:{
    type: String,
    enum: ["Activo", "Pausado"],
    default: "Activo"
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EsquemaCategorias"
  },
  nombre: {
    type: String,
  },
  precio: {
    type: Number,
  },
  stock: {
    type: Number,
    default: 0
  },
  descripcion: {
    type: String
  },
  comentarios: {
    type: String
  },
  disable: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: String,
    immutable: true,
    default: () => moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY')
  },
  modified_at: {
    // type: Date
  }
});


module.exports = mongoose.model("EsquemaProductos", esquemaProductos);