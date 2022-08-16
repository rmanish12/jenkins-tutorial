const { getUserDetails, updateUserProfile } = require("./dbHelper");

const getUserDetailsById = async id => {
  const result = await getUserDetails(id);
  const { email, firstname, lastname, gender } = result.rows[0];
  return { email, firstName: firstname, lastName: lastname, gender };
};

const updateUser = async ({ id, email, firstName, lastName, gender }) => {
  await updateUserProfile({ id, firstName, lastName, gender });
  return { email, firstName, lastName, gender };
};

module.exports = { getUserDetailsById, updateUser };
