// src/models/index.js
const User = require("./User");
const Favorite = require("./Favorite");

function setupModels(sequelize) {
  // Cargar modelos
  const models = {
    User: User(sequelize),
    Favorite: Favorite(sequelize),
  };

  // Establecer relaciones
  models.User.belongsToMany(models.Favorite, { through: "user_favorites" });
  models.Favorite.belongsToMany(models.User, { through: "user_favorites" });

  return models;
}

module.exports = setupModels;
