const { User } = require("../../DB_connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Faltan credenciales",
      message: "Email y contraseña son obligatorios",
    });
  }

  try {
    // Buscar usuario incluyendo todos los campos (excepto password)
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] }, // Excluir solo la contraseña
    });

    // Verificación de credenciales (necesitamos comparar con la contraseña encriptada)
    if (!user) {
      const userWithPassword = await User.findOne({
        where: { email },
        attributes: ["password"], // Solo traemos la contraseña para verificación
      });

      if (!userWithPassword) {
        return res.status(401).json({
          success: false,
          error: "Credenciales inválidas",
          message: "Email o contraseña incorrectos",
        });
      }

      const isMatch = await bcrypt.compare(password, userWithPassword.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Credenciales inválidas",
          message: "Email o contraseña incorrectos",
        });
      }

      // Si la contraseña coincide pero no teníamos el usuario, lo buscamos completo
      const fullUser = await User.findOne({
        where: { email },
        attributes: { exclude: ["password"] },
      });

      // Generar sessionToken
      const sessionToken = jwt.sign(
        { id: fullUser.id, email: fullUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        success: true,
        sessionToken,
        expiresIn: "24h",
        user: fullUser, // Todos los datos del usuario
      });
    }

    // Generar sessionToken para el caso normal (donde ya teníamos el usuario)
    const sessionToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      success: true,
      sessionToken,
      expiresIn: "24h",
      user: user, // Todos los datos del usuario
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      success: false,
      error: "Error interno",
      message: "Error al procesar el login",
    });
  }
};

module.exports = login;
