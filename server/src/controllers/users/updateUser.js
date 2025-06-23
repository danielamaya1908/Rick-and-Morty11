const { User } = require("../../DB_connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const updateUser = async (req, res) => {
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
      details: error.message
    });
  }

  // 3. Extraer datos de actualización (excluyendo userId)
  const { userId: _, ...updateData } = req.body;

  try {
    // 4. Validar token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Buscar usuario
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No encontrado",
        message: `Usuario con ID ${userId} no encontrado`,
      });
    }

    // 6. Verificar permisos
    if (decoded.id !== user.id && decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Prohibido",
        message: "No tienes permiso para actualizar este usuario",
      });
    }

    // 7. Encriptar password si se proporciona
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // 8. Actualizar usuario
    await user.update(updateData);

    // 9. Obtener usuario actualizado (sin password)
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      success: true,
      message: "Usuario actualizado correctamente",
      user: updatedUser,
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

    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(err => ({
        field: err.path,
        message: err.message,
        type: err.type
      }));
      return res.status(400).json({
        success: false,
        error: "Error de validación",
        message: "Datos de actualización inválidos",
        errors
      });
    }

    // Error genérico
    return res.status(500).json({
      success: false,
      error: "Error del servidor",
      message: "Error al actualizar el usuario",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = updateUser;