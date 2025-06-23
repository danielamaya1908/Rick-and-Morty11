const express = require("express");
const router = express.Router();

// Importar rutas específicas
const usersRouter = require("./users");
const charactersRouter = require("../apis/routes/characters"); // Asumiré que crearás este
const favoritesRouter = require("./favorites"); // Asumiré que crearás este

// Usar las rutas específicas con prefijos
router.use("/users", usersRouter);
router.use("/character", charactersRouter);
router.use("/favorites", favoritesRouter);

module.exports = router;
