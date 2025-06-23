const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  // 1. Buscar el token en dos lugares posibles:
  const token =
    req.headers["sessiontoken"] || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Acceso no autorizado",
      message: "Token no proporcionado",
    });
  }

  // 2. Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: "Token inválido",
        message: "Sesión expirada o inválida",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
