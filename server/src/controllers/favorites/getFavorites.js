const { Favorite } = require("../../DB_connection");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Necesario para obtener datos del personaje
require("dotenv").config();

const getFavorites = async (req, res) => {
  try {
    const token = req.headers.sessiontoken || req.headers["sessiontoken"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token requerido en los headers como 'sessiontoken'",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // 1. Obtener los favoritos básicos de la BD
    const favorites = await Favorite.findAll({
      where: {
        user_id: userId,
        is_favorite: true,
      },
      attributes: ["id", "character_id", "created_at"], // Solo estos campos existen
      order: [["created_at", "DESC"]],
      raw: true,
    });

    // 2. Obtener los datos completos de cada personaje desde la API
    const favoritesWithDetails = await Promise.all(
      favorites.map(async (fav) => {
        try {
          const response = await axios.get(
            `https://rickandmortyapi.com/api/character/${fav.character_id}`
          );
          return {
            ...fav,
            name: response.data.name,
            status: response.data.status,
            image: response.data.image,
            species: response.data.species,
            gender: response.data.gender,
            origin: response.data.origin?.name || "Unknown",
          };
        } catch (error) {
          console.error(
            `Error obteniendo personaje ${fav.character_id}:`,
            error.message
          );
          return {
            ...fav,
            name: "Unknown",
            status: "Unknown",
            image: "",
            species: "Unknown",
            gender: "Unknown",
            origin: "Unknown",
          };
        }
      })
    );

    return res.json({
      success: true,
      favorites: favoritesWithDetails,
    });
  } catch (error) {
    console.error("ERROR EN GET FAVORITES:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token inválido",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expirado",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error al obtener favoritos",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = getFavorites;
