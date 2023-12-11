const { Router } = require("express");
const { check } = require("express-validator");
const { validateJwt } = require("../middlewares/validate-jwt")
const { validateAdmin } = require("../middlewares/validate-admin");
const {
    createDispositivo,
    readDispositivos,
    updateDispositivo,
    readDispositivo,
    deleteDispositivo
} = require("../controllers/dispositivoController");

const router = Router();

// Ruta para crear un nuevo dispositivo
router.post("/", [ validateJwt, validateAdmin ], [
    // Validación de datos utilizando express-validator para la creación de dispositivos
    check("serial", "invalid.serial").not().isEmpty(),
    check("modelo", "invalid.modelo").not().isEmpty(),
    check("descripcion", "invalid.descripcion").not().isEmpty(),
    check("color", "invalid.color").not().isEmpty(),
    check("foto", "invalid.foto").optional().not().isEmpty(),
    check("fechaCompra", "invalid.fechaCompra").not().isEmpty(),
    check("precio", "invalid.precio").not().isEmpty(),
    check("usuario", "invalid.usuario").optional().not().isEmpty(),
    check("marca", "invalid.marca").not().isEmpty(),
    check("tipo", "invalid.tipo").not().isEmpty(),
    check("estado", "invalid.estado").not().isEmpty(),
], createDispositivo);

// Ruta para obtener todos los dispositivos
router.get("/", validateJwt,  readDispositivos);

// Ruta para obtener un dispositivo por su ID
router.get("/:id", validateJwt, readDispositivo);

// Ruta para actualizar un dispositivo por su ID
router.put("/:id", [ validateJwt, validateAdmin ], [
    // Validación de datos utilizando express-validator para la actualización de dispositivos
    check("serial", "invalid.serial").optional().not().isEmpty(),
    check("modelo", "invalid.modelo").optional().not().isEmpty(),
    check("descripcion", "invalid.descripcion").optional().not().isEmpty(),
    check("color", "invalid.color").optional().not().isEmpty(),
    check("foto", "invalid.foto").optional().not().isEmpty(),
    check("fechaCompra", "invalid.fechaCompra").optional().not().isEmpty(),
    check("precio", "invalid.precio").optional().not().isEmpty(),
    check("usuario", "invalid.usuario").optional().not().isEmpty(),
    check("marca", "invalid.marca").optional().not().isEmpty(),
    check("tipo", "invalid.tipo").optional().not().isEmpty(),
    check("estado", "invalid.estado").optional().not().isEmpty(),
], updateDispositivo);

// Ruta para eliminar un dispositivo por su ID
router.delete("/:id", [ validateJwt, validateAdmin ], deleteDispositivo);

module.exports = router;
