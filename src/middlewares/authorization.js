const { USER_ROLES } = require("../utils/constants/common");
const { errorMessage } = require("../utils/constants/response");
const UnauthorizedError = require("../errors/Unauthorized");

const checkForAdminRole = (req, res, next) => {
  const { role } = req.user;
  if (role === USER_ROLES.ADMIN_USER || role === USER_ROLES.SUPER_USER) {
    return next();
  }
  throw new UnauthorizedError(errorMessage.UNAUTHORIZED);
};

module.exports = { checkForAdminRole };
