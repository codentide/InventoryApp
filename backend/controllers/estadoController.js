// Importación de módulos y modelos necesarios
const mongoose = require("mongoose");
const Estado = require("../models/estado"); // Importa el modelo de estado
const { validationResult } = require("express-validator");

// Función para crear un nuevo estado
const createEstado = async (req, res) => {
    try {
        const { nombre, estado } = req.body;

        // Validación de errores utilizando express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        // Verifica si ya existe un estado con el mismo nombre
        const estadoExists = await Estado.findOne({ nombre });
        if (estadoExists) {
            return res.status(400).send("Ya existe un estado con el nombre: " + nombre);
        }

        // Crea un nuevo estado con los datos proporcionados
        let estadoDispositivo = new Estado();
        estadoDispositivo.nombre = nombre;
        estadoDispositivo.estado = estado;

        estadoDispositivo = await estadoDispositivo.save();

        return res.status(201).json(estadoDispositivo); // Retorna el estado creado
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al crear estado");
    }
};

// Función para leer todos los estados
const readEstados = async (req, res) => {
    try {
        const estados = await Estado.find();

        if (estados.length === 0) {
            return res.status(400).send("No hay estados guardados");
        }

        return res.status(200).send(estados); // Retorna todos los estados
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al leer estados");
    }
};

// Función para leer un estado por su ID
const readEstado = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("ID no válido");
        }

        const estadoDispositivo = await Estado.findById(id);

        if (!estadoDispositivo) {
            return res.status(404).send("Estado no encontrado");
        }

        return res.status(200).send(estadoDispositivo); // Retorna el estado encontrado
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Función para actualizar un estado por su ID
const updateEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("MongoId no válido");
        }

        // Validación de errores utilizando express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        let estadoDispositivo = await Estado.findById(id);
        if (!estadoDispositivo) {
            return res.status(404).send("Estado no encontrado");
        }

        // Verifica si se está intentando cambiar el nombre y si ya existe un estado con ese nombre
        if (nombre !== undefined && nombre !== estadoDispositivo.nombre) {
            const estadoDispositivoExists = await Estado.findOne({ nombre });
            if (estadoDispositivoExists) {
                return res.status(400).send("Ya existe un estado con el nombre: " + nombre);
            }
        }

        // Actualiza el estado con los nuevos valores proporcionados
        estadoDispositivo.fechaModificacion = Date.now();
        estadoDispositivo.nombre = nombre || estadoDispositivo.nombre;
        estadoDispositivo.estado = estado || estadoDispositivo.estado;

        estadoDispositivo = await estadoDispositivo.save();

        return res.status(200).send(estadoDispositivo); // Retorna el estado actualizado
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar estado");
    }
};

// Función para eliminar un estado por su ID
const deleteEstado = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("Id no válido");
        }

        const estadoDispositivo = await Estado.findByIdAndDelete(id);

        if (!estadoDispositivo) {
            return res.status(404).send("Estado no encontrado");
        }

        return res.status(200).send("Estado eliminado con éxito"); // Retorna mensaje de éxito
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar estado");
    }
}

module.exports = {
    createEstado,
    readEstados,
    readEstado,
    updateEstado,
    deleteEstado
};
