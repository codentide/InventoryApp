// Importación de módulos y modelos necesarios
const mongoose = require("mongoose");
const Dispositivo = require("../models/dispositivo"); // Importa el modelo de Dispositivo
const { validationResult } = require("express-validator");

// Función para crear un nuevo dispositivo
const createDispositivo = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const {
            serial,
            modelo,
            descripcion,
            color,
            foto,
            precio,
            usuario,
            marca,
            tipo,
            estado,
            fechaCompra
        } = req.body;

        // Validación de errores utilizando express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() }); // Retorna errores de validación si existen
        }

        // Verifica si ya existe un dispositivo con el mismo número de serie
        const serialExists = await Dispositivo.findOne({ serial });
        if (serialExists) {
            return res.status(400).send("Ya existe un dispositivo con el serial: " + serial);
        }

        // Crea un nuevo dispositivo con los datos proporcionados
        let dispositivo = new Dispositivo();
        // Asigna los valores a las propiedades del dispositivo
        dispositivo.serial = serial;
        dispositivo.modelo = modelo;
        dispositivo.descripcion = descripcion;
        dispositivo.color = color;
        dispositivo.foto = foto;
        dispositivo.precio = precio;
        dispositivo.usuario = usuario;
        dispositivo.marca = marca;
        dispositivo.tipo = tipo;
        dispositivo.estado = estado;
        dispositivo.fechaCompra = fechaCompra;

        // Guarda el nuevo dispositivo en la base de datos
        dispositivo = await dispositivo.save();
        return res.status(201).json(dispositivo); // Retorna el dispositivo creado

    } catch (err) {
        // Captura y manejo de errores
        console.error(err);
        res.status(500).send("Ha sucedido un error al crear el dispositivo");
    }
}

// Función para leer todos los dispositivos
const readDispositivos = async (req, res) => {
    try {
        // Obtiene todos los dispositivos y sus datos relacionados
        const dispositivos = await Dispositivo.find()
            .populate("usuario", "nombre email")
            .populate("marca", "nombre")
            .populate("tipo", "nombre")
            .populate("estado", "nombre");

        if (dispositivos.length === 0) {
            return res.status(202).send("No hay dispositivos guardados");
        }
        return res.status(201).send(dispositivos);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar estado");
    }
};

// Función para leer un dispositivo específico por su ID
const readDispositivo = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("ID no válido");
        }

        const dispositivo = await Dispositivo.findById(id)
            .populate("usuario", "nombre email")
            .populate("marca", "nombre")
            .populate("tipo", "nombre")
            .populate("estado", "nombre");

        if (!dispositivo) {
            return res.status(202).send("Dispositivo no encontrado");
        }
        return res.status(201).send(dispositivo);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar estado");
    }
};

// Función para actualizar un dispositivo
const updateDispositivo = async (req, res) => {
    const { id } = req.params;
    const {
        serial,
        modelo,
        descripcion,
        color,
        foto,
        precio,
        usuario,
        marca,
        tipo,
        estado,
        fechaCompra
    } = req.body;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("MongoId no válido");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        let dispositivo = await Dispositivo.findById(id)
        if (!dispositivo) {
            return res.status(202).send("Dispositivo no encontrado");
        }

        // Verifica si hay un dispositivo con el mismo número de serie
        if (serial !== undefined && serial !== dispositivo.serial) {
            const serialExists = await Dispositivo.findOne({ serial });
            if (serialExists) {
                return res.status(400).send("Ya existe un dispositivo con el serial: " + serial);
            }
            dispositivo.serial = serial;
        }

        dispositivo.fechaModificacion = Date.now();
        dispositivo.modelo = modelo || dispositivo.modelo;
        dispositivo.descripcion = descripcion || dispositivo.descripcion;
        dispositivo.color = color || dispositivo.color;
        dispositivo.foto = foto || dispositivo.foto;
        dispositivo.precio = precio || dispositivo.precio;
        dispositivo.usuario = usuario || dispositivo.usuario;
        dispositivo.marca = marca || dispositivo.marca;
        dispositivo.tipo = tipo || dispositivo.tipo;
        dispositivo.estado = estado || dispositivo.estado;
        dispositivo.fechaCompra = fechaCompra || dispositivo.fechaCompra;

        dispositivo = await dispositivo.save();
        return res.status(200).send(dispositivo);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar dispositivo");
    }
};

// Función para eliminar un dispositivo por su ID
const deleteDispositivo = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("MongoId no válido");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        let dispositivo = await Dispositivo.findByIdAndDelete(id)
        if (!dispositivo) {
            return res.status(404).send("Dispositivo no encontrado");
        }
        return res.status(200).send("Dispositivo eliminado con éxito");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar estado");
    }
};

// Exporta las funciones para su uso en otros archivos
module.exports = {
    createDispositivo,
    readDispositivos,
    readDispositivo,
    updateDispositivo,
    deleteDispositivo,
};
