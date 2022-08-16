const { getUserByIdService, updateUserService } = require("../userService");
const {
  getUserDetailsById,
  updateUser
} = require("../../../repository/user/userRepository");
const {
  getUserDetailsRepositoryResponse,
  updateUserRequest
} = require("../../../__mock__/user/userMockData");

jest.mock("../../../repository/user/userRepository");

describe("User service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data", async () => {
    getUserDetailsById.mockResolvedValue(getUserDetailsRepositoryResponse);
    const result = await getUserByIdService(1);
    expect(result).toEqual(getUserDetailsRepositoryResponse);
  });

  it("should return updated user data", async () => {
    const { id, ...rest } = updateUserRequest;
    updateUser.mockResolvedValue(rest);
    const result = await updateUserService(updateUserRequest);
    expect(result).toEqual(rest);
  });
});
