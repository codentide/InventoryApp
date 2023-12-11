const jwt = require('jsonwebtoken');

// Middleware para validar tokens JWT
const validateJwt = (req, res, next) => {
    const token = req.header("Authorization");

    // Verifica si no hay token
    if (!token){
        return res.status(401).json({ msj: 'No autorizado'});
    }

    try {
        // Verifica y decodifica el token utilizando jwt.verify
        const payload = jwt.verify(token, '12321'); 
        req.payload = payload; // Asigna el payload decodificado a req.payload
        next();  // Pasa al siguiente middleware o ruta
        
    } catch (err) {
        console.error(err);
        return res.status(401).json({ msj: 'Error de autorización'});
    }
}

module.exports = {
    validateJwt
}
