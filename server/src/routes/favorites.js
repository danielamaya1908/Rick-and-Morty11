const express = require("express");
const router = express.Router();
const postFav = require("../controllers/fav/postFav"); // Asumiendo que creaste un index.js
const deleteFav = require("../controllers/fav/deleteFav"); // Asumiendo que creaste un index.js

router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;
