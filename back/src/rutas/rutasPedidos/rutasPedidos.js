const { Router } = require("express");
const moment = require('moment-timezone');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");

const esquemaUsuarios = require("../../esquemas/EsquemaUsuarios/EsquemaUsuarios");
const esquemaPedidos = require("../../esquemas/EsquemaPedidos/EsquemaPedidos");
const esquemaReferidos = require("../../esquemas/EsquemaReferidos/EsquemaReferidos");
const esquemaProductos = require("../../esquemas/EsquemaProductos/EsquemaProductos");

const router = Router();
const { TOKEN_KEY } = process.env;

router.post("/", async (req, res) => {
  try {
    const { fecha_solicitud, referido, porcentaje_referido, pedido, acc, token } = req.body;

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

          const missingFields = [];

          if (!referido) {
            missingFields.push("referido");
          };

          if (!pedido) {
            missingFields.push("pedido");
          };

          if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan los siguientes campos requeridos: ${missingFields.join(", ")}` });
          };

          const referidoObjectId = mongoose.Types.ObjectId(referido);

          let pedidoFormateado = pedido?.map(p => ({
            ...p,
            producto: mongoose.Types.ObjectId(p.producto)
          }));
          console.log(pedidoFormateado);

          await Promise.all(pedidoFormateado.map(async p => {
            let productoPedido = await esquemaProductos.findById(p?.producto);
            await esquemaProductos.updateOne({ _id: productoPedido?._id }, { $set: { stock: productoPedido?.stock - p?.cantidad } });

            // let productoPedidoActualizado = await esquemaProductos.findById(p?.producto);
            // console.log(productoPedidoActualizado);
          }));

          let subTotalPedido = 0;

          pedido?.map(p => {
            subTotalPedido += p.total
          });

          let comision_referido = (Number(porcentaje_referido) * subTotalPedido) / 100

          let fecha_formateada;
          if (fecha_solicitud) {
            fecha_formateada = moment(fecha_solicitud).format('DD/MM/YYYY');
          } else {
            let fecha_del_dia = Date.now();
            fecha_formateada = moment(fecha_del_dia).format('DD/MM/YYYY');
          }

          const nuevoPedido = await esquemaPedidos.create({
            fecha_solicitud: fecha_formateada,
            pedido: pedidoFormateado,
            referido: referidoObjectId,
            subTotalPedido,
            comision_referido,
            porcentaje_referido
          });
          // console.log(nuevoPedido);

          await esquemaReferidos.updateOne({ _id: referidoObjectId }, { $inc: { comision: comision_referido } });

          res.json({ msg: "Pedido creado" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el pedido" });
  }
});

router.get("/", async (req, res) => {
  try {
    // const { nombre } = req.body;
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
          // let consulta = {};

          // if (nombre) consulta.nombre = nombre;

          // controlar que funcione correctamente. controlado? NO
          const todosPedidos = await esquemaPedidos.find()
            .populate([
              { path: "referido" },
              { path: "pedido.producto" }
            ]);
          res.send(todosPedidos);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener los pedidos" });
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
          const pedidoPorId = await esquemaPedidos.findById(id)
            .populate([
              { path: "referido" },
              { path: "pedido.producto" }
            ]);
          res.send(pedidoPorId);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado, acc, token } = req.body;

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

          if (comision) {
            updateFields.comision = comision;
          };

          if (estado) {
            updateFields.estado = estado;
          };

          updateFields.modified_at = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY');

          const pedidoModificado = await esquemaPedidos.updateOne({ _id: id }, { $set: updateFields });

          if (pedidoModificado.nModified === 0) {
            res.status(404).send({ error: "No se pudo modificar el pedido" });
          } else {
            const pedidoActualizado = await esquemaPedidos.findOne({ _id: id });
            res.send(pedidoActualizado);
          };
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al modificar el pedido" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(401).json({ error: "" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
      // console.log(verificarUsuario);

      if (!verificarUsuario) {
        res.status(401).json({ error: "" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        // console.log(decodedToken);

        if (decodedToken.expiredAt) {
          res.status(401).json({ error: "" });

        } else {
          const pedidoAEliminar = await esquemaPedidos.findById(id).populate([
            { path: "referido" },
            { path: "pedido.producto" }
          ]);
          if (!pedidoAEliminar) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });

          } else {
            if (pedidoAEliminar.estado === "Pagado" || pedidoAEliminar.estado === "Despachado" || pedidoAEliminar.estado === "Entregado") {
              res.status(404).send({ error: "No se puede eliminar el pedido" });
            } else {

              // let pedidoFormateado = pedidoAEliminar?.pedido?.map(p => ({
              //   ...p,
              //   producto: mongoose.Types.ObjectId(p.producto),
              // }));
              // console.log(pedidoFormateado);

              await Promise.all(pedidoAEliminar?.pedido.map(async p => {
                let productoPedido = await esquemaProductos.findById(p?.producto);
                await esquemaProductos.updateOne(
                  { _id: productoPedido?._id },
                  { $set: { stock: productoPedido?.stock + p?.cantidad } }
                );

                // let productoPedidoActualizado = await esquemaProductos.findById(p?.producto);
                // console.log(productoPedidoActualizado);
              }));

              const referidoPedido = await esquemaReferidos.updateOne({ _id: pedidoAEliminar?.referido?._id }, { $inc: { comision: -pedidoAEliminar?.comision_referido } })

              await esquemaPedidos.deleteOne({ _id: id });
              res.json({ msg: "Pedido eliminado" });
            }
          }
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al borrar el pedido" });
  }
});


module.exports = router;
