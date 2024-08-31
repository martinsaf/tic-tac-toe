const Sequelize = require("sequelize");
require("dotenv").config();

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Desabilita logs SQL no console
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importação dos modelos
db.players = require("./player")(sequelize, Sequelize);
db.games = require("./game")(sequelize, Sequelize);

module.exports = db;
