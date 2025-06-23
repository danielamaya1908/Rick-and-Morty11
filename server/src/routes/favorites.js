// src/routes/favorites.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const toggleFavorite = require("../controllers/favorites/toggleFavorite");
const getFavorites = require("../controllers/favorites/getFavorites");

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Ruta para toggleFavorite (POST /favorites)
router.post("/", toggleFavorite);

// Ruta para getFavorites (GET /favorites)
router.get("/getFavorites", getFavorites);

module.exports = router;
