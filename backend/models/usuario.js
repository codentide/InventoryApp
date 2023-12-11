const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, "Nombre requerido"],
        minlength: 1,
    },
    email: {
        type: String,
        required: [true, "Email requerido"],
        minlength: 1,
        unique: true,    
    }, 
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo',
    },
    clave: {
        type: String,
        required: [true, "Clave de acceso requerida"]
    },
    rol: {
        type: String,
        required: [true, "Rol requerido"],
        enum: ['Docente', 'Administrador']
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaModificacion: {
        type: Date,
    },    
    
});

module.exports = model("Usuario", UsuarioSchema);