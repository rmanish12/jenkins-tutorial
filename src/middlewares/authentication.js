const { decryptToken } = require("../helper/jwt");
const UnautheticatedError = require("../errors/Unauthenticated");

const authenticateUser = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  let id;
  let role;
  try {
    if (!bearerToken) throw new UnautheticatedError("Unautheticated");
    const authToken = bearerToken.substring(7);
    const payload = await decryptToken(authToken);
    id = payload.id;
    role = payload.role;
  } catch (err) {
    next(new UnautheticatedError("Unautheticated"));
  }
  req.user = { id, role };
  next();
};

module.exports = authenticateUser;
