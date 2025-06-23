const { User } = require("../../DB_connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/**
 * @description Crea un nuevo usuario en la base de datos
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} JSON response with user data or error message
 */
const createUser = async (req, res) => {
  // 1. Validación de campos requeridos
  const requiredFields = [
    "name",
    "lastName",
    "email",
    "password",
    "country",
    "city",
    "postalCode",
    "phoneNumber",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Faltan campos obligatorios",
      missingFields,
      message: `Los siguientes campos son requeridos: ${missingFields.join(
        ", "
      )}`,
    });
  }

  // 2. Extracción de datos
  const {
    name,
    lastName,
    email,
    password,
    country,
    city,
    postalCode,
    phoneNumber,
  } = req.body;

  try {
    // Verificación de conexión a la base de datos
    await User.sequelize.authenticate();

    // 3. Validar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        error: "El usuario ya existe",
        message: "El correo electrónico proporcionado ya está registrado",
      });
    }

    // 4. Crear el nuevo usuario
    const newUser = await User.create({
      name,
      lastName,
      email,
      password, // Se encripta automáticamente por el hook en el modelo
      country,
      city,
      postalCode,
      phoneNumber,
    });

    // 5. Generar sessionToken JWT para autenticación inmediata
    const sessionToken = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 6. Preparar respuesta (excluyendo información sensible)
    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      lastName: newUser.lastName,
      email: newUser.email,
      country: newUser.country,
      city: newUser.city,
      postalCode: newUser.postalCode,
      phoneNumber: newUser.phoneNumber,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    // 7. Retornar respuesta exitosa
    return res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      user: userResponse,
      sessionToken,
      expiresIn: "24h",
    });
  } catch (error) {
    // Manejo específico de errores de validación de Sequelize
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(400).json({
        error: "Error de validación",
        validationErrors,
        message: "Por favor corrige los datos ingresados",
      });
    }

    // Manejo de errores de conexión
    if (error.name === "SequelizeConnectionError") {
      return res.status(503).json({
        error: "Error de conexión a la base de datos",
        message: "No se pudo conectar al servidor de base de datos",
      });
    }

    // Error general del servidor
    return res.status(500).json({
      error: "Error interno del servidor",
      message:
        "Ocurrió un error al procesar tu solicitud. Por favor intenta nuevamente.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = createUser;
