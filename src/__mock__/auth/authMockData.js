exports.mockRegisterRequest = {
  email: "email@example.com",
  password: "password",
  firstName: "firstName",
  lastName: "lastName",
  gender: "MALE"
};

exports.mockLoginRequest = {
  email: "email@example.com",
  password: "password"
};

exports.mockGetUserDetailForLogin = {
  rows: [{ id: 1, password: "password", isactive: true, role: "NORMAL_USER" }]
};

exports.mockChangePasswordRequest = {
  oldPassword: "abcdef",
  newPassword: "abcdefg"
};
