const { Router } = require("express");
const { check } = require("express-validator");
const { validateJwt } = require("../middlewares/validate-jwt")
const { validateAdmin } = require("../middlewares/validate-admin");
const { 
    createMarca, 
    readMarcas, 
    updateMarca, 
    readMarca, 
    deleteMarca } = require("../controllers/marcaController");
const router = Router();

router.post("/", [ validateJwt, validateAdmin ], [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
], createMarca);

router.get("/", [ validateJwt, validateAdmin ], readMarcas);
router.get("/:id", [ validateJwt, validateAdmin ], readMarca);

router.put("/:id", [ validateJwt, validateAdmin ], [
    check("nombre").optional().not().isEmpty().withMessage("invalid.nombre"),
    check("estado").optional().isIn(["Activo", "Inactivo"]).withMessage("invalid.estado")    
], updateMarca)

router.delete("/:id", [ validateJwt, validateAdmin ], deleteMarca);

module.exports = router;
