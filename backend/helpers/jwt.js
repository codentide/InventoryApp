const jwt = require('jsonwebtoken');
//const usuario = require('../models/usuario');

// Función para generar un token JWT
const generateJwt = (usuario) => {
    // Datos del usuario que se utilizarán como parte del payload en el token
    const payload = { 
        _id: usuario._id, 
        nombre: usuario.nombre,
        rol: usuario.rol,
        estado: usuario.estado,
        email: usuario.email, 
        clave: usuario.clave, 
    }

    // Se genera el token utilizando el método sign de JWT
    const token = jwt.sign(payload, '12321', { expiresIn: '2h' });
    
    return token; // Devuelve el token generado
}

module.exports = {
    generateJwt
}
