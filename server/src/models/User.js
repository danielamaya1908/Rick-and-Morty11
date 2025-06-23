// src/models/User.js
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre no puede estar vacío",
          },
          len: {
            args: [2, 50],
            msg: "El nombre debe tener entre 2 y 50 caracteres",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El apellido no puede estar vacío",
          },
          len: {
            args: [2, 50],
            msg: "El apellido debe tener entre 2 y 50 caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          name: "users_email_unique",
          msg: "Este correo electrónico ya está registrado",
        },
        validate: {
          isEmail: {
            msg: "Debe proporcionar un correo electrónico válido",
          },
          notEmpty: {
            msg: "El correo electrónico no puede estar vacío",
          },
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La contraseña no puede estar vacía",
          },
          len: {
            args: [6, 100],
            msg: "La contraseña debe tener entre 6 y 100 caracteres",
          },
        },
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El país no puede estar vacío",
          },
        },
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La ciudad no puede estar vacía",
          },
        },
      },
      postalCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El código postal no puede estar vacío",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El número de teléfono no puede estar vacío",
          },
          is: {
            args: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            msg: "Proporcione un número de teléfono válido",
          },
        },
      },
    },
    {
      tableName: "users", // Nombre explícito de la tabla en minúsculas
      timestamps: true, // Habilita createdAt y updatedAt
      underscored: true, // Convierte camelCase a snake_case
      paranoid: false, // No habilita eliminación suave
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  // Método para comparar contraseñas
  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
