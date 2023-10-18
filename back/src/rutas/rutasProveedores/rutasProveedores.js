const { Router } = require("express");
const moment = require('moment-timezone');
require("dotenv").config();
const jwt = require('jsonwebtoken');

const esquemaProveedores = require("../../esquemas/EsquemaProveedores/EsquemaProveedores");
const esquemaUsuarios = require("../../esquemas/EsquemaUsuarios/EsquemaUsuarios");
const router = Router();

const { TOKEN_KEY } = process.env;

router.post("/", async (req, res) => {
  try {
    const { nombre, email, telefono, descripcion, acc, token } = req.body;

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
          const proveedorACrear = {};

          if (!nombre) {
            missingFields.push("nombre");
          };

          if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan los siguientes campos requeridos: ${missingFields.join(", ")}` });
          };

          const existeProveedor = await esquemaProveedores.findOne({ nombre });
          if (existeProveedor) {
            return res.status(409).json({ error: "Ya existe un proveedor con ese nombre." });
            // 409 conflicto
          };

          const nuevoProveedor = await esquemaProveedores.create({
            nombre,
            email,
            telefono,
            descripcion
          });
          res.json({ msg: "Proveedor creado" });
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al crear el proveedor" });
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
          const todosProveedores = await esquemaProveedores.find();
          res.send(todosProveedores);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener los proveedores" });
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
          const proveedorPorId = await esquemaProveedores.findById(id);
          res.send(proveedorPorId);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener el proveedor" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, nombre, email, telefono, descripcion, acc, token } = req.body;

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

          if (estado) {
            updateFields.estado = estado;
          };

          if (nombre) {
            updateFields.nombre = nombre;
          };

          if (email) {
            updateFields.email = email;
          };

          if (telefono) {
            updateFields.telefono = telefono;
          };

          if (descripcion) {
            updateFields.descripcion = descripcion;
          };

          updateFields.modified_at = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY');

          const proveedorModificado = await esquemaProveedores.updateOne({ _id: id }, { $set: updateFields });

          if (proveedorModificado.nModified === 0) {
            res.status(404).send({ error: "No se pudo modificar el proveedor" });
          } else {
            const proveedorActualizado = await esquemaProveedores.findOne({ _id: id });
            res.send(proveedorActualizado);
          };
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al modificar el proveedor" });
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
          await esquemaProveedores.deleteOne({ _id: id });
          res.json({ msg: "Proveedor eliminado" });
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al borrar el proveedor" });
  }
});



module.exports = router;