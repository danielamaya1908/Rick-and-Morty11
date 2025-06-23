// src/models/Favorite.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre no puede estar vacío",
          },
        },
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El estado no puede estar vacío",
          },
        },
      },
      species: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La especie no puede estar vacía",
          },
        },
      },
      gender: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El género no puede estar vacío",
          },
        },
      },
      origin: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El origen no puede estar vacío",
          },
        },
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La imagen no puede estar vacía",
          },
          isUrl: {
            msg: "Debe proporcionar una URL válida para la imagen",
          },
        },
      },
      characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          isInt: {
            msg: "El ID del personaje debe ser un número entero",
          },
        },
      },
    },
    {
      tableName: "favorites", // Nombre explícito de la tabla en minúsculas
      timestamps: false, // No usa createdAt ni updatedAt
      underscored: true, // Convierte camelCase a snake_case
      paranoid: false, // No habilita eliminación suave
    }
  );

  return Favorite;
};
