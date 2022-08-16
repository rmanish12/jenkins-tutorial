const AlreadyExistError = require("../../errors/AlreadyExist");
const NotFoundError = require("../../errors/NotFound");
const {
  checkIfUserExist,
  insertNewUser,
  getUserDetailForLogin,
  updateUserPassword,
  getUserCredById
} = require("./dbHelper");
const { errorMessage } = require("../../utils/constants/response");

const createUser = async ({ email, password, firstName, lastName, gender }) => {
  const userExist = await checkIfUserExist(email);
  if (userExist.rows[0].count > 0) {
    throw new AlreadyExistError(errorMessage.USER_EXIST);
  }

  await insertNewUser({ email, password, firstName, lastName, gender });
};

const loginUser = async ({ email }) => {
  const userExist = await checkIfUserExist(email);
  if (+userExist.rows[0].count === 0) {
    throw new NotFoundError(errorMessage.CREDENTIAL_ERROR);
  }

  const result = await getUserDetailForLogin({ email });
  const userDetails = result.rows[0];

  return userDetails;
};

const changePassword = async ({ id, newPassword }) =>
  updateUserPassword({ id, password: newPassword });

const getUserById = async ({ id }) => {
  const result = await getUserCredById({ id });
  return result.rows[0];
};

module.exports = { createUser, loginUser, changePassword, getUserById };
