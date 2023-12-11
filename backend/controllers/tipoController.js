// Importación de módulos y modelos necesarios
const mongoose = require("mongoose");
const Tipo = require("../models/tipo"); // Importa el modelo de tipo
const { validationResult } = require("express-validator");

// Función para crear un nuevo tipo
const createTipo = async (req, res) => {
    try {
        const { nombre, estado } = req.body;

        // Validación de errores utilizando express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        // Verifica si ya existe un tipo con el mismo nombre
        const tipoExists = await Tipo.findOne({ nombre });
        if (tipoExists) {
            return res.status(400).send("Ya existe un tipo con el nombre: " + nombre);
        }

        // Crea un nuevo tipo con los datos proporcionados
        let tipo = new Tipo();
        tipo.nombre = nombre;
        tipo.estado = estado;

        tipo = await tipo.save();

        return res.status(201).json(tipo); // Retorna el tipo creado
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al crear tipo");
    }
};

// Función para leer todos los tipos
const readTipos = async (req, res) => {
    try {
        const tipos = await Tipo.find();

        if (tipos.length === 0) {
            return res.status(400).send("No hay tipos guardados");
        }

        return res.status(200).send(tipos); // Retorna todos los tipos
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al leer tipos");
    }
};

// Función para leer un tipo por su ID
const readTipo = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("ID no válido");
        }

        const tipo = await Tipo.findById(id);

        if (!tipo){
            return res.status(404).send("Tipo no encontrado");
        }

        return res.status(200).send(tipo); // Retorna el tipo encontrado
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Función para actualizar un tipo por su ID
const updateTipo = async (req, res) => {
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

        let tipo = await Tipo.findById(id);
        if (!tipo) return res.status(404).send("Tipo no encontrado");

        // Verifica si se está intentando cambiar el nombre y si ya existe un tipo con ese nombre
        if (nombre !== undefined && nombre !== tipo.nombre) {
            const tipoExists = await Tipo.findOne({ nombre });
            if (tipoExists) return res.status(400).send("Ya existe un tipo con el nombre: " + nombre);
        }

        // Actualiza el tipo con los nuevos valores proporcionados
        tipo.fechaModificacion = Date.now();
        tipo.nombre = nombre || tipo.nombre;
        tipo.estado = estado || tipo.estado;

        tipo = await tipo.save();

        return res.status(200).send(tipo); // Retorna el tipo actualizado
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar tipo");
    }
};

// Función para eliminar un tipo por su ID
const deleteTipo = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) return res.status(400).send("Id no válido");

        const tipo = await Tipo.findByIdAndDelete(id);

        if (!tipo) return res.status(404).send("Tipo no encontrado");

        return res.status(200).send("Tipo eliminado con éxito"); // Retorna mensaje de éxito
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar tipo");
    }
}

module.exports = {
    createTipo,
    readTipos,
    readTipo,
    updateTipo,
    deleteTipo
};
