const { StatusCodes } = require("http-status-codes");
const logger = require("../../logger");
const {
  createUserService,
  loginUserService,
  changePasswordService
} = require("../../services/auth/authService");

const registerUser = async (req, res, next) => {
  logger.info("Invoking request for user registration");
  try {
    const { email, password, firstName, lastName, gender } = req.body;
    await createUserService({ email, password, firstName, lastName, gender });
    res.status(StatusCodes.CREATED).send({ success: true });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  logger.info("Invoking request for login");
  try {
    const { email, password } = req.body;
    const data = await loginUserService({ email, password });
    res.status(StatusCodes.OK).send(data);
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  logger.info("Invoking request for change password");
  try {
    const { newPassword, oldPassword } = req.body;
    const { id } = req.user;
    await changePasswordService({ id, newPassword, oldPassword });
    res.status(StatusCodes.OK).send({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, changePassword };
