// Importación de módulos y modelos necesarios
const bcrypt = require("bcryptjs"); // Importa bcrypt para la encriptación de contraseñas
const mongoose = require("mongoose");
const Usuario = require("../models/usuario"); // Importa el modelo de Usuario
const { validationResult } = require("express-validator");

// Función para crear un nuevo usuario
const createUsuario = async (req, res) => {
    const { nombre, email, rol, estado, clave } = req.body; // Extrae datos del cuerpo de la solicitud

    try {
        // Validación de errores utilizando express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() }); // Retorna errores de validación si existen
        }

        // Verifica si el usuario ya existe por su email
        const usuarioExists = await Usuario.findOne({ email: email });
        if (usuarioExists) {
            return res.status(400).send("Ya existe un usuario con el email: " + email);
        }

        // Crea un nuevo usuario con los datos proporcionados
        let usuario = new Usuario();
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.rol = rol;
        usuario.estado = estado;

        // Encripta la contraseña antes de guardarla en la base de datos
        const salt = bcrypt.genSaltSync();
        const claveSalt = bcrypt.hashSync(clave, salt);
        usuario.clave = claveSalt;

        // Guarda el nuevo usuario en la base de datos
        usuario = await usuario.save();

        // Retorna el usuario creado con el código 201 (Created)
        return res.status(201).json(usuario);

    } catch (err) {
        // Captura y manejo de errores
        console.error(err);
        return res.status(500).send("Error al crear usuario");
    }
};

// Función para leer todos los usuarios
const readUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find(); // Busca todos los usuarios en la base de datos

        if (usuarios.length === 0) {
            return res.status(400).send("No hay usuarios guardados");
        }

        return res.status(201).send(usuarios); // Retorna la lista de usuarios
    } catch (err) {
        console.error(err);
        res.status(500).send("Ha sucedido un error al leer usuarios");
    }
};

const readUsuario = async (req, res) => {

    const { id } = req.params;

    try {
        
        if (!mongoose.isValidObjectId(id)) return res.status(400).send("ID no válido");
    
        const usuario = await Usuario.findById(id);

        if (!usuario) return res.status(400).send("Usuario no encontrado")

        return res.status(200).send(usuario)

    } catch (err) {

        console.error(err);
        return res.status(500).send(err);
        
    }       

}

// Función para actualizar un usuario existente
const updateUsuario = async (req, res) => {
    const { id } = req.params; // Obtiene el ID del usuario a actualizar
    const { nombre, email, rol, estado, clave } = req.body; // Datos actualizados del usuario

    try {
        // Validar el ObjectID
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("MongoId no válido");
        }

        // Validación de errores utilizando express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        // Verifica si el usuario existe por su ID
        let usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Validar y actualizar campos solo si se proporcionan en la solicitud
        if (email !== undefined && email !== usuario.email) {
            const emailExists = await Usuario.findOne({ email });
            if (emailExists) {
                return res.status(400).send("Ya existe un usuario con el email: " + email);
            }
            usuario.email = email;
        }

        usuario.fechaModificacion = Date.now();
        usuario.nombre = nombre || usuario.nombre;
        usuario.rol = rol || usuario.rol;
        usuario.estado = estado || usuario.estado;

        if (clave) {
            const salt = bcrypt.genSaltSync();
            const claveSalt = bcrypt.hashSync(clave, salt);
            usuario.clave = claveSalt;
        }

        // Guarda el usuario actualizado en la base de datos
        usuario = await usuario.save();

        return res.status(200).send(usuario); // Retorna el usuario actualizado

    } catch (err) {
        // Captura y manejo de errores
        console.error(err);
        return res.status(500).send("Error al actualizar usuario");
    }
};

// Funcion para borrar usuario
const deleteUsuario = async (req, res) => {

    // Atrapa el id que se manda por url
    const { id } = req.params;

    try {

        // Se valida el id como object id
        if (!mongoose.isValidObjectId(id)){

            return res.status(400).send("Id no válido");
        
        } 
        // Se busco un usuario con el id definido y se elimina
        const usuario = await Usuario.findByIdAndDelete(id);
        // Si usuario es undefined quiere decir que no se eliminó
        if (!usuario) {

            return res.status(404).send("Usuario no encontrado");
        
        } 
        return res.status(200).send("Usuario eliminado con éxito");

    } catch (err) {

        console.error(err);
        return res.status(500).send("Error al actualizar estado");  

    }

};

module.exports = {
    createUsuario,
    readUsuarios,
    readUsuario,
    updateUsuario,
    deleteUsuario
};
