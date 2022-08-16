const { StatusCodes } = require("http-status-codes");
const logger = require("../../logger");
const {
  getUserByIdService,
  updateUserService
} = require("../../services/user/userService");

const getUserDetails = async (req, res, next) => {
  logger.info("Invoking request for getting user details");
  try {
    const { id } = req.user;
    const userDetails = await getUserByIdService(id);
    res.status(StatusCodes.OK).send(userDetails);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  logger.info("Invoking request for updating user details");
  try {
    const { id } = req.user;
    const { email, firstName, lastName, gender } = req.body;
    const updatedUserDetails = await updateUserService({
      id,
      email,
      firstName,
      lastName,
      gender
    });
    res.status(StatusCodes.OK).send(updatedUserDetails);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserDetails, updateUser };
