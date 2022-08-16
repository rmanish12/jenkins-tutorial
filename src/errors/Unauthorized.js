const { StatusCodes } = require("http-status-codes");
const { errorCode } = require("../utils/constants/response");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.code = errorCode.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
