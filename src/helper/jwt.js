const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../env");

const issueToken = payload => {
  const expiresIn = "1d";

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn
  });

  return { token };
};

const decryptToken = token => {
  const { id, role } = jwt.verify(token, JWT_SECRET);
  return { id, role };
};

module.exports = { issueToken, decryptToken };
