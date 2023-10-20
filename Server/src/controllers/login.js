const { User } = require('../DB_connection');

const login = (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (user.password !== password) {
        return res.status(403).json({ message: "Contraseña incorrecta" });
      }

      return res.json({ access: true });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ message: error.message });
    });
};

module.exports = login;
