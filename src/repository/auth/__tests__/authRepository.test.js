const {
  createUser,
  loginUser,
  changePassword,
  getUserById
} = require("../authRepository");
const {
  checkIfUserExist,
  insertNewUser,
  getUserDetailForLogin,
  updateUserPassword,
  getUserCredById
} = require("../dbHelper");
const { errorMessage } = require("../../../utils/constants/response");
const {
  mockRegisterRequest,
  mockLoginRequest,
  mockGetUserDetailForLogin
} = require("../../../__mock__/auth/authMockData");

jest.mock("../dbHelper");

describe("Auth repository test", () => {
  describe("Register user", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should create new user", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 0 }] });
      insertNewUser.mockResolvedValue({});
      await createUser(mockRegisterRequest);
      expect(insertNewUser).toHaveBeenCalledWith(mockRegisterRequest);
    });

    it("should throw user exists error while registering if user is already present", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 1 }] });
      try {
        await createUser(mockRegisterRequest);
      } catch (err) {
        expect(err.message).toEqual(errorMessage.USER_EXIST);
      }
    });
  });

  describe("Login user", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should login registered user", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 1 }] });
      getUserDetailForLogin.mockResolvedValue(mockGetUserDetailForLogin);
      const result = await loginUser({ email: "email@example.com" });
      expect(result).toEqual({
        id: 1,
        isactive: true,
        role: "NORMAL_USER",
        password: "password"
      });
    });

    it("should throw credential error if user with the given email does not exist", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 0 }] });
      try {
        await loginUser(mockLoginRequest);
      } catch (err) {
        expect(err.message).toEqual(errorMessage.CREDENTIAL_ERROR);
      }
    });
  });

  describe("Change password", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call updateUserPassword dbHelper", async () => {
      updateUserPassword.mockResolvedValue({});
      await changePassword({ id: 1, newPassword: "abcdef" });
      expect(updateUserPassword).toHaveBeenCalledWith({
        id: 1,
        password: "abcdef"
      });
    });
  });

  describe("Get user by id", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return user password", async () => {
      getUserCredById.mockImplementation(() => ({
        rows: [{ password: "abcdef" }]
      }));
      const result = await getUserById({ id: 1 });
      expect(getUserCredById).toHaveBeenCalledWith({ id: 1 });
      expect(result.password).toEqual("abcdef");
    });
  });
});
