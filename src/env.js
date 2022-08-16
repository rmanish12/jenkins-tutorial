require("dotenv").config();

const {
  NODE_ENV,
  ALLOWED_ORIGIN,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  JWT_SECRET
} = process.env;
const PORT = process.env.PORT || 5000;

module.exports = {
  PORT,
  NODE_ENV,
  ALLOWED_ORIGIN,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  JWT_SECRET
};
