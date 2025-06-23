const { User } = require("../../DB_connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const deleteUser = async (req, res) => {
  // 1. Verificar token
  const token = req.headers["sessiontoken"];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No autorizado",
      message: "Se requiere token de autenticación",
    });
  }

  // 2. Validar userId como número
  let userId;
  try {
    userId = parseInt(req.body.userId);
    if (isNaN(userId)) {
      throw new Error("userId debe ser un número");
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "ID inválido",
      message: "El userId debe ser un número válido",
      details: error.message,
    });
  }

  try {
    // 3. Validar token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Buscar usuario
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No encontrado",
        message: `Usuario con ID ${userId} no encontrado`,
      });
    }

    // 5. Verificar permisos (solo el propio usuario o admin puede eliminar)
    if (decoded.id !== user.id && decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Prohibido",
        message: "No tienes permiso para eliminar este usuario",
      });
    }

    // 6. Eliminar usuario
    await user.destroy();

    // 7. Retornar respuesta
    return res.status(200).json({
      success: true,
      message: `Usuario con ID ${userId} eliminado correctamente`,
    });
  } catch (error) {
    // Manejo específico de errores
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Token inválido",
        message: "Token de autenticación no válido",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expirado",
        message: "La sesión ha expirado, por favor vuelva a iniciar sesión",
      });
    }

    // Error genérico
    return res.status(500).json({
      success: false,
      error: "Error del servidor",
      message: "Error al eliminar el usuario",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = deleteUser;
