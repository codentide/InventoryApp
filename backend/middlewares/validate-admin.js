const jwt = require("jsonwebtoken");

const validateAdmin = (req, res, next) => {

    if (req.payload.rol != "Administrador"){
        return res.status(401).json({ mensaje: "Rol no autorizado" })
    }
    next();

}

module.exports = { validateAdmin } 