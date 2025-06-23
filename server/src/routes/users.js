const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

const createUser = require("../controllers/users/createUser");
const getAllUsers = require("../controllers/users/getAllUsers");
const getUserById = require("../controllers/users/getUserById");
const updateUser = require("../controllers/users/updateUser");
const deleteUser = require("../controllers/users/deleteUser");
const loginUser = require("../controllers/users/login");

// Rutas públicas (sin autenticación)
router.post("/login", loginUser);
router.post("/createUser", createUser);
router.get("/getAllUsers", authenticateToken, getAllUsers);

// Rutas protegidas (requieren token JWT válido)
router.get("/getUserById", authenticateToken, getUserById);
router.put("/updateUser", authenticateToken, updateUser);
router.delete("/deleteUser", authenticateToken, deleteUser);
// Ruta para verificar validez del token (sesión)
router.get("/verify", authenticateToken, (req, res) => {
  return res.status(200).json({ valid: true, user: req.user });
});
// Ruta para verificar si un email ya existe
router.get("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const { User } = require("../DB_connection");
    const user = await User.findOne({ where: { email } });
    return res.json({ exists: !!user });
  } catch (error) {
    return res.status(500).json({ exists: false, error: error.message });
  }
});

module.exports = router;
