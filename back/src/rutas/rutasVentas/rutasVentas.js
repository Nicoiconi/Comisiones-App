const { Router } = require("express");
const moment = require('moment-timezone');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");

const esquemaUsuarios = require("../../esquemas/EsquemaUsuarios/EsquemaUsuarios");
const esquemaVentas = require("../../esquemas/EsquemaVentas/EsquemaVentas");
const esquemaPedidos = require("../../esquemas/EsquemaPedidos/EsquemaPedidos");

const router = Router();

const { TOKEN_KEY } = process.env;

router.post("/", async (req, res) => {
  try {
    const { referido, pago, pedidos, direccion, entrega, total_a_pagar, total_pedidos, acc, token } = req.body;

    if (!(acc && token)) {
      res.status(404).json({ error: "" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });


      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {

        const decodedToken = jwt.verify(token, TOKEN_KEY);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          let referidoObjectId = mongoose.Types.ObjectId(referido);

          let pedidosVentaFormateado = pedidos?.map(p => mongoose.Types.ObjectId(p));

          let fechaPagoFormateada;

          if (pago?.fecha_de_pago) {
            fechaPagoFormateada = moment(pago?.fecha_de_pago).format('DD/MM/YYYY');
          } else {
            let fecha_del_dia = Date.now();
            fechaPagoFormateada = moment(fecha_del_dia).format('DD/MM/YYYY');
          };


          const nuevaVenta = await esquemaVentas.create({
            referido: referidoObjectId,
            pedidos: pedidosVentaFormateado,
            pago: {
              ...pago,
              fecha_de_pago: fechaPagoFormateada
            },
            // direccion: direccionFormateada,
            entrega,
            total_a_pagar
          });

          console.log(nuevaVenta);

          Promise.all(
            pedidosVentaFormateado?.map(p => {
              return esquemaPedidos.updateOne({ _id: p }, { $set: { estado: "Pagado" } })
                .then(result => {
                  // Hacer algo con el resultado si es necesario
                  // console.log('Actualización completada:', result);
                })
                .catch(error => {
                  // Manejar errores específicos para cada actualización
                  // console.error('Error al actualizar documento:', error);
                });
            })
          );

        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la venta" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { nombre } = req.body;
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(404).json({ error: "" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
      // console.log(verificarUsuario);

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        // console.log(decodedToken);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          let consulta = {};

          if (nombre) consulta.nombre = nombre;

          // controlar que funcione correctamente. controlado? NO
          const todasVentas = await esquemaVentas.find().populate([
            { path: "referido" },
            { path: "pedidos" }
          ]);
          res.send(todasVentas);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(404).json({ error: "" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
      // console.log(verificarUsuario);

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        // console.log(decodedToken);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });

        } else {
          const ventaPorId = await esquemaVentas.findById(id).populate([
            { path: "referido" },
            { path: "pedidos" },
            // { path: "direccion.sucursal" }
          ]);
          res.send(ventaPorId);

        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener la venta" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado, direccion, entrega, total_a_pagar, pago, acc, token } = req.body;

    if (!(acc && token)) {
      res.status(404).json({ error: "" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
      // console.log(verificarUsuario);

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        // console.log(decodedToken);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          let updateFields = {};

          if (nombre) {
            updateFields.nombre = nombre;
          };

          if (estado) {
            updateFields.estado = estado;
          };

          if (entrega) {
            updateFields.entrega = entrega;
          };

          if (total_a_pagar) {
            updateFields.total_a_pagar = total_a_pagar;
          };

          if (pago) {
            updateFields.pago = pago;
          };

          updateFields.modified_at = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY');

          const ventaActualizada = await esquemaVentas.updateOne({ _id: id }, { $set: updateFields });

          if (ventaActualizada.nModified === 0) {
            res.status(404).send({ error: "No se pudo modificar la venta" });
          } else {
            const ventaActualizada = await esquemaVentas.findOne({ _id: id });
            res.send(ventaActualizada);
          }
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al editar la venta" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(404).json({ error: "" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
      // console.log(verificarUsuario);

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        // console.log(decodedToken);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          const ventaAEliminar = await esquemaVentas.findById(id);
          // console.log(ventaAEliminar);
          await Promise.all(
            ventaAEliminar?.pedidos?.map(async p => {
              try {
                await esquemaPedidos.updateOne({ _id: p }, { $set: { estado: "Pendiente de pago" } });
                console.log('Pedido actualizado:');
              } catch (error) {
                console.error('Error al actualizar pedido:', error);
              }
            })
          );

          await esquemaVentas.deleteOne({ _id: id });
          res.json({ msg: "Venta eliminada" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al borrar la venta" });
  }
});

module.exports = router;
