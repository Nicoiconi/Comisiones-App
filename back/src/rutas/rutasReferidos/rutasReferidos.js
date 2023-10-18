require("dotenv").config();
const { Router } = require("express");
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const esquemaReferidos = require("../../esquemas/EsquemaReferidos/EsquemaReferidos");
const esquemaUsuarios = require("../../esquemas/EsquemaUsuarios/EsquemaUsuarios");

const router = Router();
const { TOKEN_KEY } = process.env;


router.post("/", async (req, res) => {
  try {
    const { nombre, acc, token } = req.body;

    if (!(acc && token)) {
      res.status(404).json({ error: "" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          const missingFields = [];

          if (!nombre) {
            missingFields.push("nombre");
          };

          if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan los siguientes campos requeridos: ${missingFields.join(", ")}` });

          } else {
            const existeReferido = await esquemaReferidos.findOne({ nombre });
            if (existeReferido) {
              return res.status(409).json({ error: "Ya existe un referido con ese nombre." });
            } else {
              const referido = await esquemaReferidos.create(req.body);
              res.json({ msg: "Referido creado" });

            }
          }
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al crear el referido" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(404).json({ error: "error" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {

        const decodedToken = jwt.verify(token, TOKEN_KEY);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          const todosReferidos = await esquemaReferidos.find();
          res.send(todosReferidos);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener los referidos" });
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

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {

        const decodedToken = jwt.verify(token, TOKEN_KEY);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {
          const referidoPorId = await esquemaReferidos.findById(id);

          if (!referidoPorId) {
            res.status(404).json({ error: "Error inesperado" });
          } else {
            res.send(referidoPorId);
          }
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener el referido" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, porcentaje_comision, estado, acc, token } = req.body;

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
          let updateFields = {};

          if (nombre) {
            updateFields.nombre = nombre;
          };

          if (porcentaje_comision) {
            updateFields.porcentaje_comision = porcentaje_comision;
          };

          if (estado) {
            updateFields.estado = estado;
          };

          updateFields.modified_at = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY');

          const referidoModificado = await esquemaReferidos.updateOne({ _id: id }, { $set: updateFields });

          if (referidoModificado.nModified === 0) {
            res.status(404).send({ error: "No se pudo modificar el referido" });
          } else {
            const referidoActualizado = await esquemaReferidos.findOne({ _id: id });
            res.send(referidoActualizado);
          };
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al editar el referido" });
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

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {

        const decodedToken = jwt.verify(token, TOKEN_KEY);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          await esquemaReferidos.deleteOne({ _id: id });
          res.json({ msg: "Referido eliminado" });
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al borrar el referido" });
  }
});



module.exports = router;
