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
      },
      character_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      // created_at y updated_at se añaden automáticamente
    },
    {
      tableName: "favorites",
      underscored: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["character_id", "user_id"],
          name: "unique_character_user",
        },
      ],
    }
  );
  return Favorite;
};
