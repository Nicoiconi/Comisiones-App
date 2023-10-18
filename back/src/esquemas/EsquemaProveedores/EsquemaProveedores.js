const mongoose = require("mongoose");
const moment = require('moment-timezone');


const esquemaProveedores = mongoose.Schema({
  estado: {
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Activo"
  },
  nombre: {
    type: String,
  },
  telefono: {
    type: Number
  },
  email: {
    type: String
  },
  descripcion: {
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


module.exports = mongoose.model("EsquemaProveedores", esquemaProveedores);