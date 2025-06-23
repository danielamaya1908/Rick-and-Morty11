const { Favorite } = require("../../DB_connection");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

const toggleFavorite = async (req, res) => {
  try {
    const token = req.headers.sessiontoken || req.headers["sessiontoken"];
    const { characterId } = req.body;

    if (!token || !characterId) {
      return res.status(400).json({
        success: false,
        message: "Token y characterId son requeridos",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Solo guardamos la relación, no los datos del personaje
    const [favorite, created] = await Favorite.findOrCreate({
      where: {
        character_id: characterId,
        user_id: userId,
      },
      defaults: {
        is_favorite: true,
      },
    });

    if (!created) {
      favorite.is_favorite = !favorite.is_favorite;
      await favorite.save();
    }

    const userFavorites = await Favorite.findAll({
      where: {
        user_id: userId,
        is_favorite: true,
      },
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      favorites: userFavorites,
      action: favorite.is_favorite ? "added" : "removed",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

module.exports = toggleFavorite;
