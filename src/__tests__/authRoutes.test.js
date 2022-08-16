const request = require("supertest");
const app = require("../app");
const {
  checkIfUserExist,
  insertNewUser,
  getUserDetailForLogin,
  updateUserPassword,
  getUserCredById
} = require("../repository/auth/dbHelper");
const { issueToken, decryptToken } = require("../helper/jwt");
const { matchPassword } = require("../helper/passwordMatcher");
const { errorMessage } = require("../utils/constants/response");
const {
  mockRegisterRequest,
  mockLoginRequest,
  mockChangePasswordRequest
} = require("../__mock__/auth/authMockData");

jest.mock("../repository/auth/dbHelper");
jest.mock("../helper/jwt");
jest.mock("../helper/passwordMatcher");

describe("Auth routes test", () => {
  describe("POST /auth/register", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should register user successfully", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 0 }] });
      insertNewUser.mockResolvedValue({});
      const { body, statusCode } = await request(app)
        .post("/auth/register")
        .send(mockRegisterRequest);
      expect(statusCode).toEqual(201);
      expect(body).toEqual({ success: true });
    });

    it("should send error in case user with the details already exists", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 1 }] });
      const { body, statusCode } = await request(app)
        .post("/auth/register")
        .send(mockRegisterRequest);
      expect(statusCode).toEqual(409);
      expect(body).toEqual({
        code: "CONFLICT",
        errors: [{ message: errorMessage.USER_EXIST }]
      });
    });

    it("should send schema validation error when request is not proper", async () => {
      const { body, statusCode } = await request(app)
        .post("/auth/register")
        .send({ ...mockRegisterRequest, phone: "123" });

      expect(statusCode).toEqual(400);
      expect(body).toEqual({
        code: "BAD_REQUEST",
        errors: [
          {
            key: "body",
            detail: { additionalProperty: "phone" },
            message: "must NOT have additional properties"
          }
        ]
      });
    });
  });

  describe("POST /auth/login", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should login user successfully", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 1 }] });
      issueToken.mockImplementation(() => ({ token: "tokenvalue" }));
      matchPassword.mockResolvedValue(true);
      getUserDetailForLogin.mockResolvedValue({
        rows: [
          { id: 1, password: "password", isactive: true, role: "NORMAL_USER" }
        ]
      });

      const { body, statusCode } = await request(app)
        .post("/auth/login")
        .send(mockLoginRequest);

      expect(statusCode).toEqual(200);
      expect(body).toEqual({ idToken: "tokenvalue" });
    });

    it("should throw not found error if user is not present", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 0 }] });
      const { body, statusCode } = await request(app)
        .post("/auth/login")
        .send({ email: "email@example.com", password: "password" });

      expect(statusCode).toEqual(404);
      expect(body).toEqual({
        code: "NOT_FOUND",
        errors: [{ message: errorMessage.CREDENTIAL_ERROR }]
      });
    });

    it("should throw forbidden error if password is incorrect", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 1 }] });
      getUserDetailForLogin.mockResolvedValue({
        rows: [
          { id: 1, password: "password", isactive: true, role: "NORMAL_USER" }
        ]
      });
      matchPassword.mockResolvedValue(false);
      const { body, statusCode } = await request(app)
        .post("/auth/login")
        .send({ email: "email@example.com", password: "password" });

      expect(statusCode).toEqual(403);
      expect(body).toEqual({
        code: "FORBIDDEN",
        errors: [{ message: errorMessage.CREDENTIAL_ERROR }]
      });
    });

    it("should throw forbidden error if user account is inactive", async () => {
      checkIfUserExist.mockResolvedValue({ rows: [{ count: 1 }] });
      getUserDetailForLogin.mockResolvedValue({
        rows: [
          { id: 1, password: "password", isactive: false, role: "NORMAL_USER" }
        ]
      });
      matchPassword.mockResolvedValue(true);
      const { body, statusCode } = await request(app)
        .post("/auth/login")
        .send(mockLoginRequest);

      expect(statusCode).toEqual(403);
      expect(body).toEqual({
        code: "FORBIDDEN",
        errors: [{ message: errorMessage.ACCOUNT_LOCKED }]
      });
    });
  });

  describe("PATCH /auth/changePassword", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      decryptToken.mockResolvedValue({ id: 1, role: "NORMAL_USER" });
      getUserCredById.mockResolvedValue({ rows: [{ password: "abcdef" }] });
      updateUserPassword.mockResolvedValue({});
    });

    it("should update the password of the user", async () => {
      matchPassword.mockResolvedValue(true);
      const { body, statusCode } = await request(app)
        .patch("/auth/changePassword")
        .set({ Authorization: "Bearer token" })
        .send(mockChangePasswordRequest);

      expect(statusCode).toEqual(200);
      expect(body).toEqual({ success: true });
    });

    it("should throw error when password is incorrect", async () => {
      matchPassword.mockResolvedValue(false);
      const { body, statusCode } = await request(app)
        .patch("/auth/changePassword")
        .set({ Authorization: "Bearer token" })
        .send(mockChangePasswordRequest);

      expect(statusCode).toEqual(403);
      expect(body).toEqual({
        code: "FORBIDDEN",
        errors: [{ message: errorMessage.CREDENTIAL_ERROR }]
      });
    });

    it("should throw error when authorization header is not present", async () => {
      matchPassword.mockResolvedValue(false);
      const { body, statusCode } = await request(app)
        .patch("/auth/changePassword")
        .send(mockChangePasswordRequest);

      expect(statusCode).toEqual(401);
      expect(body).toEqual({
        code: "UNAUTHENTICATED",
        errors: [{ message: errorMessage.UNAUTHENTICATED }]
      });
    });
  });
});
