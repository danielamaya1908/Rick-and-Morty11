const { conn } = require("./DB_connection");

conn
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");

    const app = require("./app");
    const PORT = 3001;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error sincronizando la base de datos:", error);
  });
