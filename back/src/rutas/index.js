const { Router } = require('express');
const router = Router();

//Importo todos los routers;

const rutasCategorias = require("./rutasCategorias/rutasCategorias");
const rutasPedidos = require("./rutasPedidos/rutasPedidos");
const rutasProductos = require("./rutasProductos/rutasProductos");
const rutasProveedores = require("./rutasProveedores/rutasProveedores");
const rutasReferidos = require("./rutasReferidos/rutasReferidos");
const rutasUsuarios = require("./rutasUsuarios/rutasUsuarios");
const rutasVentas = require("./rutasVentas/rutasVentas");


//Configuro todos los routers

router.use("/categorias", rutasCategorias);
router.use("/pedidos", rutasPedidos);
router.use("/productos", rutasProductos);
router.use("/proveedores", rutasProveedores);
router.use("/referidos", rutasReferidos);
router.use("/usuarios", rutasUsuarios);
router.use("/ventas", rutasVentas);




module.exports = router;
