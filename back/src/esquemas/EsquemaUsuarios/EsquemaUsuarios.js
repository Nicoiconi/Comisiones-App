const mongoose = require("mongoose");
const moment = require('moment-timezone');

const esquemaUsuarios = mongoose.Schema({
  estado: {
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Activo"
  },
  acc: {
    type: String,
    require,
    unique: true
  },
  nombre: {
    type: String,
    require
  },
  pass: {
    type: String,
    require
  },
  token: {
    type: String
  },
  // se puede agregar una propiedad que vaya guardando los numeros por mes
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

module.exports = mongoose.model("EsquemaUsuarios", esquemaUsuarios);