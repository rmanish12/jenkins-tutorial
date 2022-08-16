const { StatusCodes } = require("http-status-codes");
const { errorCode } = require("../utils/constants/response");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.code = errorCode.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
