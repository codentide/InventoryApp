// Importación de módulos y modelos necesarios
const bcrypt = require("bcryptjs"); // Importa bcrypt para la encriptación de contraseñas
const mongoose = require("mongoose");
const Marca = require("../models/marca"); // Importa el modelo de marca
const { validationResult } = require("express-validator");

// Función para crear una nueva marca
const createMarca = async (req, res) => {
    try {
        const { nombre, estado } = req.body;

        // Validación de errores utilizando express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        // Verifica si ya existe una marca con el mismo nombre
        const marcaExists = await Marca.findOne({ nombre });
        if (marcaExists) {
            return res.status(400).send("Ya existe una marca con el nombre: " + nombre);
        }

        // Crea una nueva marca con los datos proporcionados
        let marca = new Marca();
        marca.nombre = nombre;
        marca.estado = estado;

        marca = await marca.save();

        return res.status(201).json(marca); // Retorna la marca creada
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al crear marca");
    }
};

// Función para leer todas las marcas
const readMarcas = async (req, res) => {
    try {
        const marcas = await Marca.find();

        if (marcas.length === 0) {
            return res.status(400).send("No hay marcas guardadas");
        }

        return res.status(200).send(marcas); // Retorna todas las marcas
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al leer marcas");
    }
};

// Función para leer una marca por su ID
const readMarca = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ msj: "ID no válido" });
        }

        const marca = await Marca.findById(id);

        if (!marca) {
            return res.status(404).send("Marca no encontrada");
        }

        return res.status(200).send(marca); // Retorna la marca encontrada
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Función para actualizar una marca por su ID
const updateMarca = async (req, res) => {
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

        let marca = await Marca.findById(id);
        if (!marca) return res.status(404).send("Marca no encontrada");

        // Verifica si se está intentando cambiar el nombre y si ya existe una marca con ese nombre
        if (nombre !== undefined && nombre !== marca.nombre) {
            const marcaExists = await Marca.findOne({ nombre });
            if (marcaExists) return res.status(400).send("Ya existe una marca con el nombre: " + nombre);
        }

        // Actualiza la marca con los nuevos valores proporcionados
        marca.fechaModificacion = Date.now();
        marca.nombre = nombre || marca.nombre;
        marca.estado = estado || marca.estado;

        marca = await marca.save();

        return res.status(200).send(marca); // Retorna la marca actualizada
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar marca");
    }
};

// Función para eliminar una marca por su ID
const deleteMarca = async (req, res) => {
    const { id } = req.params;

    try {
        // Válida el objectId
        if (!mongoose.isValidObjectId(id)) return res.status(400).send("Id no válido");

        // Busca y elimina la marca con el id seleccionado
        const marca = await Marca.findByIdAndDelete(id);

        // Si marca es undefined significa que no se eliminó
        if (!marca) return res.status(404).send("Marca no encontrada");

        return res.status(200).send("Marca eliminada con éxito"); // Retorna mensaje de éxito
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar marca");
    }
}

module.exports = {
    createMarca,
    readMarcas,
    readMarca,
    updateMarca,
    deleteMarca
};
