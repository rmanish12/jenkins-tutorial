const request = require("supertest");
const app = require("../app");
const { decryptToken } = require("../helper/jwt");
const { errorMessage } = require("../utils/constants/response");
const {
  getUserDetails,
  updateUserProfile
} = require("../repository/user/dbHelper");
const {
  getUserDetailsDbResponse,
  getUserDetailsRepositoryResponse
} = require("../__mock__/user/userMockData");

jest.mock("../helper/jwt");
jest.mock("../repository/user/dbHelper");

describe("User routes test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /user", () => {
    it("should return user details", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "NORMAL_USER" });
      getUserDetails.mockResolvedValue({ rows: [getUserDetailsDbResponse] });
      const { body, statusCode } = await request(app)
        .get("/user")
        .set({ Authorization: "Bearer abc" });

      expect(statusCode).toEqual(200);
      expect(body).toEqual(getUserDetailsRepositoryResponse);
    });

    it("should throw unauthenticated error if bearer token is missing", async () => {
      getUserDetails.mockResolvedValue({ rows: [getUserDetailsDbResponse] });
      const { body, statusCode } = await request(app).get("/user");

      expect(statusCode).toEqual(401);
      expect(body).toEqual({
        code: "UNAUTHENTICATED",
        errors: [{ message: errorMessage.UNAUTHENTICATED }]
      });
    });
  });

  describe("PUT /user", () => {
    it("should return updated user details", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "NORMAL_USER" });
      updateUserProfile.mockResolvedValue({});
      const { body, statusCode } = await request(app)
        .put("/user")
        .set({ Authorization: "Bearer abc" })
        .send(getUserDetailsRepositoryResponse);

      expect(statusCode).toEqual(200);
      expect(body).toEqual(getUserDetailsRepositoryResponse);
    });

    it("should throw unauthenticated error when bearer token is missing", async () => {
      updateUserProfile.mockResolvedValue({});
      const { body, statusCode } = await request(app)
        .put("/user")
        .send(getUserDetailsRepositoryResponse);

      expect(statusCode).toEqual(401);
      expect(body).toEqual({
        code: "UNAUTHENTICATED",
        errors: [{ message: errorMessage.UNAUTHENTICATED }]
      });
    });
  });
});
