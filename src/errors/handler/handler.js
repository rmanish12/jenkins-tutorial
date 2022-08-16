const { StatusCodes } = require("http-status-codes");
const logger = require("../../logger");
const { errorCode, errorMessage } = require("../../utils/constants/response");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  logger.error(JSON.stringify(err));
  const errors = [];

  // for checking validation errors by ajv
  if (Array.isArray(err)) {
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.code = errorCode.BAD_REQUEST;
    err.forEach(error =>
      errors.push({
        key: error.key,
        message: error.message,
        detail: error.params
      })
    );
  } else {
    const message = err.message || errorMessage.INTERNAL_SERVER_ERROR;
    errors.push({ message });
  }

  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const code = err.code || errorCode.INTERNAL_SERVER_ERROR;

  res.status(status).send({
    code,
    errors
  });
};

module.exports = errorHandler;
