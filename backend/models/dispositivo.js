const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DispositivoSchema = new Schema({

    serial: {
        type: String,
        required: [true, "Serial requerido"],
        minlength: 1,
        unique: true,
    },
    modelo: {
        type: String, 
        required: [true, "Modelo requerido"],
        unique: true,
    },
    descripcion: {
        type: String, 
        required: [true, "Descripción requerida"]
    },
    color:{
        type: String, 
        required: [true, "Color requerido"]
    },
    foto: {
        type: String,
        required: [true, "Url de la foto requerida"]
    },
    precio: {
        type: Number,
        required: [true, "Precio requerido"]
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario", 
        required: false
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: "Marca", 
        required: [true, "Marca del dispositivo requerida"]
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: "Tipo", 
        required: [true, "Tipo del dispositivo requerido"]
    }, 
    estado: {
        type: Schema.Types.ObjectId,
        ref: "Estado", 
        required: [true, "Estado del dispositivo requerido"]
    },
    fechaCompra: {
        type: Date,
        required: [true, "Fecha de compra requerida"]
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaModificacion: {
        type: Date,
    },    
    
});

module.exports = model("Dispositivo", DispositivoSchema);

