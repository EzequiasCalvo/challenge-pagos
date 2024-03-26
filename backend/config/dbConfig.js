const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("DB connection error", err));

module.exports = pool;
