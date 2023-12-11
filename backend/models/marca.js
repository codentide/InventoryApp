const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MarcaSchema = new Schema({

    nombre: {
        type: String,
        required: [true, "Nombre requerido"],
        minlength: 1,
        unique: true,
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo',
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaModificacion: {
        type: Date,
    },    
    
});

module.exports = model("Marca", MarcaSchema);