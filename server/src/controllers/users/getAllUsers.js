const { User } = require("../../DB_connection");

const getAllUsers = async (req, res) => {
  try {
    // Obtener parámetros de paginación (página actual, por defecto 1)
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // 5 usuarios por página
    const offset = (page - 1) * limit;

    // Obtener el conteo total de usuarios y los usuarios paginados
    const { count: totalUsers, rows: users } = await User.findAndCountAll({
      // Incluir todos los atributos (sin exclusión)
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    // Calcular el total de páginas
    const totalPages = Math.ceil(totalUsers / limit);

    return res.status(200).json({
      success: true,
      totalUsers,
      totalPages,
      currentPage: page,
      usersPerPage: limit,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      message: "Error al obtener los usuarios",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = getAllUsers;
