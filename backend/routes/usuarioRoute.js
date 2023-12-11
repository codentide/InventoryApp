const { Router } = require("express");
const { check } = require("express-validator");
const { validateAdmin } = require("../middlewares/validate-admin");
const { validateJwt } = require("../middlewares/validate-jwt")


const {
    createUsuario, 
    readUsuarios, 
    updateUsuario, 
    readUsuario, 
    deleteUsuario 
} = require("../controllers/usuarioController");

const router = Router();

// Ruta para la creación de usuario con las validaciones y controlador correspondientes
router.post("/",  [ validateJwt, validateAdmin ], [
    // Validaciones para los campos requeridos al crear un usuario
    check("nombre", "invalid.nombre").not().isEmpty(), // Nombre no debe estar vacío
    check("email", "invalid.email").not().isEmpty(), // Email no debe estar vacío
    check("clave", "invalid.clave").not().isEmpty(), // Clave no debe estar vacía
    check("rol", "invalid.rol").isIn(["Administrador", "Docente"]), // Rol debe ser Administrador o Docente
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]), // Estado debe ser Activo o Inactivo
], createUsuario); // Llama a la función 'createUsuario' del controlador cuando se hace una solicitud POST a '/'

router.get("/", [ validateJwt, validateAdmin ], readUsuarios); // Ruta para obtener todos los usuarios, llama a 'readUsuario' en una solicitud GET a '/'
router.get("/:id", [ validateJwt, validateAdmin ], readUsuario);

router.put("/:id" ,  [ validateJwt, validateAdmin ], [
    // Validaciones para los campos opcionales al actualizar un usuario por su ID
    check("nombre").optional().not().isEmpty().withMessage("invalid.nombre"), // Nombre no debe estar vacío si se proporciona
    check("email").optional().not().isEmpty().withMessage("invalid.email"), // Email no debe estar vacío si se proporciona
    check("clave").optional().not().isEmpty().withMessage("invalid.clave"), // Clave no debe estar vacía si se proporciona
    check("rol").optional().isIn(["Administrador", "Docente"]).withMessage("invalid.rol"), // Rol debe ser Administrador o Docente si se proporciona
    check("estado").optional().isIn(["Activo", "Inactivo"]).withMessage("invalid.estado"), // Estado debe ser Activo o Inactivo si se proporciona
], updateUsuario); // Llama a la función 'updateUsuario' del controlador cuando se hace una solicitud PUT a '/:id'

router.delete("/:id",  [ validateJwt, validateAdmin ], deleteUsuario);

module.exports = router; // Exporta el enrutador con las rutas definidas


