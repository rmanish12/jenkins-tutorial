const { getUserDetailsById, updateUser } = require("../userRepository");
const { getUserDetails, updateUserProfile } = require("../dbHelper");
const {
  getUserDetailsRepositoryResponse,
  getUserDetailsDbResponse,
  updateUserRequest
} = require("../../../__mock__/user/userMockData");

jest.mock("../dbHelper");

describe("User repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user details", async () => {
    getUserDetails.mockResolvedValue({
      rows: [getUserDetailsDbResponse]
    });
    const result = await getUserDetailsById(1);
    expect(result).toEqual(getUserDetailsRepositoryResponse);
  });

  it("should update user details", async () => {
    updateUserProfile.mockResolvedValue({});
    const result = await updateUser(updateUserRequest);
    const { id, email, ...rest } = updateUserRequest;
    expect(updateUserProfile).toHaveBeenCalledWith({ ...rest, id });
    expect(result).toEqual({ ...rest, email });
  });
});
