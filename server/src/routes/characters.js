const express = require("express");
const router = express.Router();
const getCharById = require("../controllers/getCharById"); // Asumiendo que lo moviste

router.get("/character/:id", getCharById);

module.exports = router;
