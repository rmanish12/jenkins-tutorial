const { StatusCodes } = require("http-status-codes");
const { errorCode } = require("../utils/constants/response");

class UnautheticatedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.code = errorCode.UNAUTHENTICATED;
  }
}

module.exports = UnautheticatedError;
