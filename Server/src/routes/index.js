// Importa tus controladores
const express = require('express');
const login = require('../controllers/login');
const getCharById = require('../controllers/getCharById');
const postFav = require('../controllers/postFav');
const deleteFav = require('../controllers/deleteFav');
const postUser = require('../controllers/postUser');
const loginUser = require('../controllers/login'); // Nuevo controlador para login

const router = express.Router();


// Define las rutas
router.get("/character/:id", getCharById);
router.get("/login", login);
router.post("/login", loginUser); // Ruta para el inicio de sesión
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);
router.post("/user", postUser); // Nueva ruta para la creación de usuarios

module.exports = router;
