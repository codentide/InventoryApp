const { Router } = require("express");
const router = Router();
const Usuario = require("../models/usuario");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const { generateJwt } = require('../helpers/jwt');

// Ruta para autenticar un usuario
router.post('/', [
    // Validación del formato del correo electrónico y que la clave no esté vacía
    check('email', 'invalid.email').isEmail(),
    check('clave', 'invalid.clave').not().isEmpty(),
], async function(req, res){

    const { email, clave } = req.body;

    try {
        // Verifica si hay errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        // Busca un usuario en la base de datos por su correo electrónico
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(400).json({ msj : "Usuario no encontrado" });
        }

        const token = generateJwt(usuario);

        // Compara la clave proporcionada con la clave almacenada encriptada en la base de datos
        const claveEquals = bcrypt.compareSync(clave, usuario.clave);
        if (!claveEquals) {
            return res.status(400).json({ msj : "El usuario o la clave no son correctos" });
        }

        // Si todo está bien, retorna el usuario autenticado
        return res.status(200).json({ 
            _id: usuario._id,
            email: usuario.email,
            nombre: usuario.nombre,
            rol: usuario.rol,
            access_token: token
        });

    } catch (err) {
        // Manejo de errores
        console.error(err);
        return res.status(500).send("Error al autenticar usuario");
    }

})

module.exports = router;
