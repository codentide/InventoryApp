const { Router } = require("express");
const { check } = require("express-validator");
const { validateAdmin } = require("../middlewares/validate-admin");
const { validateJwt } = require("../middlewares/validate-jwt");
const { 
    createTipo, 
    readTipos, 
    updateTipo, 
    readTipo, 
    deleteTipo 
} = require("../controllers/tipoController");
const router = Router();


router.post("/", [ validateJwt, validateAdmin ], [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
], createTipo);

router.get("/", [ validateJwt, validateAdmin ], readTipos);
router.get("/:id", [ validateJwt, validateAdmin ], readTipo);

router.put("/:id", [ validateJwt, validateAdmin ], [
    check("nombre").optional().not().isEmpty().withMessage("invalid.nombre"),
    check("estado").optional().isIn(["Activo", "Inactivo"]).withMessage("invalid.estado")    
], updateTipo)

router.delete("/:id", [ validateJwt, validateAdmin ], deleteTipo);

module.exports = router;