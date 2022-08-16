const { StatusCodes } = require("http-status-codes");
const { errorCode } = require("../utils/constants/response");

class AlreadyExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
    this.code = errorCode.CONFLICT;
  }
}

module.exports = AlreadyExistError;
