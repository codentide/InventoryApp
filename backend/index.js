// Importación de módulos
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getConnection } = require('./database/mongo-connection'); // Importa la función de conexión a la base de datos

// Creación de la aplicación Express
const app = express();
const host = "0.0.0.0"; // Host de la aplicación
const port = process.env.PORT; // Puerto obtenido desde variables de entorno

// Middleware
app.use(cors()); // Habilita CORS para permitir solicitudes desde diferentes dominios
getConnection(); // Establece la conexión con la base de datos
app.use(express.json()); // Habilita el uso de JSON en las solicitudes

// Rutas
app.use('/inventory-app/v1/usuario', require('./routes/usuarioRoute')); // Usa las rutas definidas en usuarioRoute para el endpoint /usuario
app.use('/inventory-app/v1/marca', require('./routes/marcaRoute'));
app.use('/inventory-app/v1/estado', require('./routes/estadoRoute'));
app.use('/inventory-app/v1/tipo', require('./routes/tipoRoute'));
app.use('/inventory-app/v1/dispositivo', require('./routes/dispositivoRoute'))

// Servicios
app.use('/inventory-app/v1/auth', require('./services/auth'));

// Inicia el servidor
app.listen(port, host, () => {
    console.log('Escuchando en el puerto ' + port); // Mensaje de consola al iniciar el servidor
});
