const express = require('express');
const server = express();
const router = require('./routes/index');

// Middleware para permitir solicitudes desde cualquier origen
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

// Middleware para interpretar el cuerpo de las solicitudes como JSON
server.use(express.json());

// Rutas
server.use("/rickandmorty", router);

module.exports = server;
