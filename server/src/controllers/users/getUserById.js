const { User } = require("../../DB_connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUserById = async (req, res) => {
  // 1. Verificar token
  const token = req.headers["sessiontoken"];
  const { userId } = req.body; // Ahora obtenemos el ID del body

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No autorizado",
      message: "Se requiere token de autenticación",
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: "ID requerido",
      message: "Debe proporcionar un userId en el cuerpo de la petición",
    });
  }

  try {
    // 2. Validar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Corregí JWT_SECRET (te faltaba la E)

    // 3. Buscar usuario
    const user = await User.findByPk(userId, {
      // Usamos userId del body
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No encontrado",
        message: "Usuario no encontrado",
      });
    }

    // 4. Verificar coincidencia (token vs userId solicitado)
    if (decoded.id !== user.id && decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Prohibido",
        message: "No tienes permiso para acceder a este recurso",
      });
    }

    // 5. Retornar respuesta
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    // Manejo de errores mejorado
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Token inválido",
        message: "El token de autenticación no es válido",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expirado",
        message: "La sesión ha caducado, por favor vuelve a iniciar sesión",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Error del servidor",
      message: "Error al obtener el usuario",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = getUserById;
