const { Router } = require("express");
const moment = require('moment-timezone');
require("dotenv").config();
const jwt = require('jsonwebtoken');

const esquemaUsuarios = require("../../esquemas/EsquemaUsuarios/EsquemaUsuarios");
const esquemaCategorias = require("../../esquemas/EsquemaCategorias/EsquemaCategorias");
const router = Router();

const { TOKEN_KEY } = process.env;

router.post("/", async (req, res) => {
  try {
    const { nombre, acc, token } = req.body;

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

          if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan los siguientes campos requeridos: ${missingFields.join(", ")}` });
          };

          const existeAnillo = await esquemaCategorias.findOne({ nombre });
          if (existeAnillo) {
            return res.status(409).json({ error: "Ya existe un categoria con ese nombre." });
            // 409 conflicto
          };



          const categoria = await esquemaCategorias.create({ nombre });
          res.json({ msg: "Categoria creado" });
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al crear el categoria" });
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
          const todosCategorias = await esquemaCategorias.find(consulta);
          res.send(todosCategorias);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener los categorias" });
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
          const categoriaPorId = await esquemaCategorias.findById(id);
          res.send(categoriaPorId);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener el categoria" });
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

          if (estado) {
            updateFields.estado = estado;
          };

          updateFields.modified_at = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY');

          const categoriaModificado = await esquemaCategorias.updateOne({ _id: id }, { $set: updateFields });

          if (categoriaModificado.nModified === 0) {
            res.status(404).send({ error: "No se pudo modificar el anillo" });
          } else {
            const categoriaActualizado = await esquemaCategorias.findOne({ _id: id });
            res.send(categoriaActualizado);
          };
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al modificar el categoria" });
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

          const categoriaAEliminar = await esquemaCategorias.findById(id);

          if(categoriaAEliminar?.razas?.length > 0) {
          res.status(404).json({ error: `No se puede eliminar el categoria, tiene ${categoriaAEliminar?.razas?.length} razas vinculadas` });

          } else {
            await esquemaCategorias.deleteOne({ _id: id });
            res.json({ msg: "categoria eliminado" });

          }
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al borrar el categoria" });
  }
});



module.exports = router;
