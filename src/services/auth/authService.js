const {
  createUser,
  loginUser,
  changePassword,
  getUserById
} = require("../../repository/auth/authRepository");
const { issueToken } = require("../../helper/jwt");
const { matchPassword } = require("../../helper/passwordMatcher");
const { encryptText } = require("../../helper/encryption");
const ForbiddenError = require("../../errors/Forbidden");
const { errorMessage } = require("../../utils/constants/response");

const createUserService = async ({
  email,
  password,
  firstName,
  lastName,
  gender
}) => {
  const encryotedPassword = await encryptText(password);
  await createUser({
    email,
    password: encryotedPassword,
    firstName,
    lastName,
    gender
  });
};

const loginUserService = async ({ email, password }) => {
  const {
    id,
    password: usrPass,
    isactive: isActive,
    role
  } = await loginUser({
    email
  });

  const isPasswordMatched = await matchPassword(usrPass, password);

  if (!isPasswordMatched) {
    throw new ForbiddenError(errorMessage.CREDENTIAL_ERROR);
  }

  if (!isActive) {
    throw new ForbiddenError(errorMessage.ACCOUNT_LOCKED);
  }
  const { token } = issueToken({ id, isActive, role });
  return { idToken: token };
};

const changePasswordService = async ({ id, oldPassword, newPassword }) => {
  const { password } = await getUserById({ id });
  const isPasswordMatched = await matchPassword(password, oldPassword);

  if (!isPasswordMatched) {
    throw new ForbiddenError(errorMessage.CREDENTIAL_ERROR);
  }
  const newEncryotedPassword = await encryptText(newPassword);
  return changePassword({ id, newPassword: newEncryotedPassword });
};

module.exports = { createUserService, loginUserService, changePasswordService };
