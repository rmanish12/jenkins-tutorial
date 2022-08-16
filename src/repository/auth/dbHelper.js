const client = require("../../db");

const checkIfUserExist = email =>
  client.query("SELECT count(*) FROM users where email = $1", [email]);

const insertNewUser = ({ email, password, firstName, lastName, gender }) =>
  client.query(
    "INSERT INTO users (email, password, first_name, last_name, gender) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [email, password, firstName, lastName, gender]
  );

const getUserDetailForLogin = ({ email }) =>
  client.query(
    "SELECT id, password, is_active as isActive, role FROM users where email = $1",
    [email]
  );

const updateUserPassword = ({ id, password }) =>
  client.query("UPDATE users SET password = $1 where id = $2", [password, id]);

const getUserCredById = ({ id }) =>
  client.query("SELECT password FROM users where id = $1", [id]);

module.exports = {
  checkIfUserExist,
  insertNewUser,
  getUserDetailForLogin,
  updateUserPassword,
  getUserCredById
};
