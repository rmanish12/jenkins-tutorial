const { Client } = require("pg");
const {
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT
} = require("../../env");
const logger = require("../../logger");

const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
});

const createConnection = async () => {
  try {
    await client.connect();
    logger.info("CONNECTED TO DB");
  } catch (err) {
    logger.error("ERROR WHILE CONNECTING TO DB", err);
  }
};

createConnection();

module.exports = client;
