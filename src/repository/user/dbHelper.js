const client = require("../../db");

const getUserDetails = id =>
  client.query(
    "SELECT email, first_name as firstName, last_name as lastName, gender FROM users where id = $1",
    [id]
  );

const updateUserProfile = ({ id, firstName, lastName, gender }) =>
  client.query(
    "UPDATE users SET first_name = $1, last_name = $2, gender = $3 WHERE id = $4",
    [firstName, lastName, gender, id]
  );

module.exports = { getUserDetails, updateUserProfile };
