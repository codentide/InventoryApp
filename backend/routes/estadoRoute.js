const { Router } = require("express");
const { check } = require("express-validator");
const { 
    createEstado, 
    readEstados, 
    updateEstado, 
    readEstado, 
    deleteEstado 
} = require("../controllers/estadoController");
const router = Router();
const { validateJwt } = require("../middlewares/validate-jwt")
const { validateAdmin } = require("../middlewares/validate-admin");

router.post("/", [ validateJwt, validateAdmin ], [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
], createEstado);

router.get("/", [ validateJwt, validateAdmin ], readEstados);
router.get("/:id", [ validateJwt, validateAdmin ], readEstado);

router.put("/:id", [ validateJwt, validateAdmin], [
    check("nombre").optional().not().isEmpty().withMessage("invalid.nombre"),
    check("estado").optional().isIn(["Activo", "Inactivo"]).withMessage("invalid.estado")    
], updateEstado)

router.delete("/:id", [ validateJwt, validateAdmin ], deleteEstado);

module.exports = router;