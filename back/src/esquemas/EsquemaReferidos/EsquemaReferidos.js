const mongoose = require("mongoose");
const moment = require('moment-timezone');

const esquemaReferidos = mongoose.Schema({
  estado: {
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Activo"
  },
  nombre: {
    type: String
  },
  ventas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EsquemaVentas"
    }
  ],
  porcentaje_comision: {
    type: Number
  },
  comision: {
    type: Number,
    default: 0
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
    // type: String,
    // default: () => moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY')
  }
});

module.exports = mongoose.model("EsquemaReferidos", esquemaReferidos);