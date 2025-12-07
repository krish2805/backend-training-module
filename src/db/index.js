
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "testdb",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected Successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = {
  sequelize,
  authenticate,
};
