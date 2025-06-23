const express = require("express");
const server = express();
const router = require("./routes/index");

// Middleware para permitir solicitudes desde localhost:3000 y manejar preflight
server.use((req, res, next) => {
  const allowedOrigin = "http://localhost:3000";
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware para interpretar el cuerpo de las solicitudes como JSON
server.use(express.json());

// Rutas
server.use("/rickandmorty", router);

module.exports = server;
