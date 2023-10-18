const mongoose = require("mongoose");
const moment = require('moment-timezone');


const esquemaPedidos = mongoose.Schema({
  estado: {
    type: String,
    enum: ["Pendiente de pago", "Pagado", "Despachado", "Entregado"],
    default: "Pendiente de pago"
  },
  codigo: {
    type: String,
    default: function () {
      return Math.random().toString(36).substring(2);
    },
  },
  referido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EsquemaReferidos"
  },
  porcentaje_referido: {
    type: Number
  },
  comision_referido: {
    type: Number
  },
  pedido: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EsquemaProductos"
      },
      cantidad: {
        type: Number
      },
      precio_unitario: {
        type: Number
      },
      total: {
        type: Number // anillo.precio x cantidad ya tiene que venir hecho el calculo. Hacer opcion de actualizar
      }
    }
  ],
  subTotalPedido: {
    type: Number
    // deberia ser la suma de pedido[N.total]
  },
  fecha_solicitud: {
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


module.exports = mongoose.model("EsquemaPedidos", esquemaPedidos);