const { Router } = require("express");
const moment = require('moment-timezone');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const esquemaUsuarios = require("../../esquemas/EsquemaUsuarios/EsquemaUsuarios");
const esquemaProductos = require("../../esquemas/EsquemaProductos/EsquemaProductos");

const router = Router();
const { TOKEN_KEY } = process.env;

router.post("/", async (req, res) => {
  try {
    const { nombre, stock, categoria, precio, descripcion, comentarios, acc, token } = req.body;

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

          const missingFields = [];

          if (!nombre) {
            missingFields.push("nombre");
          };

          if (!precio) {
            missingFields.push("precio");
          };

          if (!categoria) {
            missingFields.push("categoria");
          };
          const categoriaObjectId = mongoose.Types.ObjectId(categoria);

          if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan los siguientes campos requeridos: ${missingFields.join(", ")}` });
          };

          const existeProducto = await esquemaProductos.findOne({ nombre });
          if (existeProducto) {
            return res.status(409).json({ error: "Ya existe un producto con ese nombre." });
            // 409 conflicto
          };


          const producto = await esquemaProductos.create({
            nombre,
            categoria: categoriaObjectId,
            precio,
            stock,
            descripcion, 
            comentarios
          });
          console.log(producto);

          const nuevoProducto = await esquemaProductos.findById(producto._id);
          console.log(nuevoProducto);
          res.send(nuevoProducto);


          // res.json({ msg: "Producto creado" });
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al crear el producto" });
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
          const todosProductos = await esquemaProductos.find()
          .populate([
            {path: "categoria"}
          ]);
          res.send(todosProductos);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// router.get("/ultimo-creado", async (req, res) => {
//   try {
//     // const { nombre } = req.body;
//     const { acc, token } = req.query;

//     if (!(acc && token)) {
//       res.status(404).json({ error: "" });
//     } else {

//       const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
//       // console.log(verificarUsuario);

//       if (!verificarUsuario) {
//         res.status(404).json({ error: "" });
//       } else {
//         // validar token
//         const decodedToken = jwt.verify(token, TOKEN_KEY);
//         // console.log(decodedToken);

//         if (decodedToken.expiredAt) {
//           res.status(404).json({ error: "" });

//         } else {

//           const productosOrdenados = await esquemaProductos.find({}).sort({ created_at: -1 });
//           console.log(productosOrdenados);
//           res.send(productosOrdenados[0]);
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error al obtener los productos" });
//   }
// });

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

          const productoPorId = await esquemaProductos.findById(id)
            .populate([
              { path: "categoria" }
            ]);
          res.send(productoPorId);
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, stock, estado, ultimo_ingresado, acc, token } = req.body;

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

          if (stock) {
            updateFields.stock = stock;
          };

          if (estado) {
            updateFields.estado = estado;
          };

          if (ultimo_ingresado) {
            updateFields.stock.ultimo_ingresado = Number(ultimo_ingresado);
          };

          updateFields.modified_at = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY');

          const productoModificado = await esquemaProductos.updateOne({ _id: id }, { $set: updateFields });

          if (productoModificado.nModified === 0) {
            res.status(404).send({ error: "No se pudo modificar el producto" });
          } else {
            const productoActualizado = await esquemaProductos.findOne({ _id: id });
            res.send(productoActualizado);
          };
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al modificar el producto" });
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
          await esquemaProductos.deleteOne({ _id: id });
          res.json({ msg: "Producto eliminado" });
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al borrar el producto" });
  }
});



module.exports = router;
