const { StatusCodes } = require("http-status-codes");
const { errorCode } = require("../utils/constants/response");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.code = errorCode.NOT_FOUND;
  }
}

module.exports = NotFoundError;
