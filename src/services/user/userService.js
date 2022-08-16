const {
  getUserDetailsById,
  updateUser
} = require("../../repository/user/userRepository");

const getUserByIdService = async id => {
  const result = await getUserDetailsById(id);
  return result;
};

const updateUserService = async ({
  id,
  email,
  firstName,
  lastName,
  gender
}) => {
  const result = await updateUser({ id, email, firstName, lastName, gender });
  return result;
};

module.exports = { getUserByIdService, updateUserService };
