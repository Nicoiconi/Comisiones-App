const mongoose = require("mongoose");
const moment = require('moment-timezone');


const esquemaVentas = mongoose.Schema({
  estado: {
    type: String,
    enum: ["Activo", "Pausado"],
    default: "Activo"
  },
  referido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EsquemaReferidos"
  },
  pedidos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EsquemaPedidos"
    }
  ],
  pago: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "EsquemaPagos"
    importe: {
      type: Number
    },
    fecha_de_pago: {
      type: String
    },
    forma_de_pago: {
      type: String
    },
    comprobante: {
      type: String
    }
  },
  entrega: {
    type: String,
    enum: ["Envio a domicilio", "Retira por sucursal"]
  },
  // direccion: {
  //   destinatario: {
  //     // nombre de quien recibe, documento tambien?
  //   },
  //   sucursal: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "EsquemaSucursales"
  //   },
  //   calle: {

  //   },
  //   altura: {

  //   },
  //   ciudad: {

  //   },
  //   provincia: {

  //   },
  //   codigo_postal: {

  //   },
  //   costo_envio: {

  //   },
  // },
  total_a_pagar: {
    type: Number
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


module.exports = mongoose.model("EsquemaVentas", esquemaVentas);