const express = require("express");
const router = express.Router();
const getCharById = require("../getCharById"); // Asumiendo que lo moviste
const getAllCharacters = require("../getAllCharacters");

router.get("/", getAllCharacters);
router.get("/:id", getCharById);

module.exports = router;
