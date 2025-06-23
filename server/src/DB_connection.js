require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_SSL, NODE_ENV } =
  process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      paranoid: false,
    },
    dialectOptions: {
      ssl: DB_SSL === "true" ? { require: true } : false,
    },
  }
);

const setupModels = require("./models");
const models = setupModels(sequelize);

const connectDB = async () => {
  try {
    await sequelize.authenticate();

    const syncOptions =
      NODE_ENV === "development" ? { force: true } : { alter: true };

    await sequelize.sync(syncOptions);
  } catch (error) {
    console.error("Database connection error:", error);

    if (NODE_ENV === "development") {
      try {
        await sequelize.sync();
      } catch (syncError) {
        console.error("Database sync error:", syncError);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

module.exports = {
  ...models,
  conn: sequelize,
  connectDB,
};
