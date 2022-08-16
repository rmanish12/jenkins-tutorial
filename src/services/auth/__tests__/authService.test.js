const {
  createUserService,
  loginUserService,
  changePasswordService
} = require("../authService");
const {
  createUser,
  loginUser,
  getUserById,
  changePassword
} = require("../../../repository/auth/authRepository");
const { issueToken } = require("../../../helper/jwt");
const { matchPassword } = require("../../../helper/passwordMatcher");
const { encryptText } = require("../../../helper/encryption");
const {
  mockRegisterRequest,
  mockLoginRequest
} = require("../../../__mock__/auth/authMockData");

jest.mock("../../../repository/auth/authRepository");
jest.mock("../../../helper/jwt");
jest.mock("../../../helper/passwordMatcher");
jest.mock("../../../helper/encryption");

describe("Auth Service test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user", async () => {
    createUser.mockImplementation(() => {});
    encryptText.mockReturnValue("password");
    await createUserService(mockRegisterRequest);
    expect(createUser).toHaveBeenCalledWith(mockRegisterRequest);
  });

  it("should login a registered user", async () => {
    loginUser.mockImplementation(() => ({
      id: 1,
      isactive: true,
      role: "NORMAL_USER"
    }));
    matchPassword.mockImplementation(() => true);
    issueToken.mockImplementation(() => ({ token: "token" }));
    const result = await loginUserService(mockLoginRequest);
    expect(result).toEqual({ idToken: "token" });
  });

  it("should change password of a user", async () => {
    getUserById.mockResolvedValue({ password: "abcdef" });
    matchPassword.mockResolvedValue(true);
    encryptText.mockResolvedValue("encrypted");
    await changePasswordService({
      id: 1,
      oldPassword: "abcdef",
      newPassword: "abcdefg"
    });
    expect(changePassword).toHaveBeenCalledWith({
      id: 1,
      newPassword: "encrypted"
    });
  });
});
