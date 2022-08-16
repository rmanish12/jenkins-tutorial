const request = require("supertest");
const app = require("../app");

const {
  getCategories,
  insertCategory,
  updateCategory,
  checkIfCategoryExist,
  deleteCaregory
} = require("../repository/category/dbHelper");
const { decryptToken } = require("../helper/jwt");
const { errorMessage } = require("../utils/constants/response");

const {
  getCategoriesResponse,
  updateCategoryRequest
} = require("../__mock__/category/categoryMockData");

jest.mock("../repository/category/dbHelper");
jest.mock("../helper/jwt");

describe("Category Routes", () => {
  describe("GET /category/:categoryType", () => {
    it("should return all categories for a particular category type", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "NORMAL_USER" });
      getCategories.mockResolvedValue({ rows: getCategoriesResponse });
      const { body, statusCode } = await request(app)
        .get("/category/income")
        .set({ Authorization: "Bearer abc" });

      expect(statusCode).toEqual(200);
      expect(body).toEqual(getCategoriesResponse);
    });
  });

  describe("POST /category", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should throw error when NORMAL_USER tries to insert category", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "NORMAL_USER" });
      const { body, statusCode } = await request(app)
        .post("/category")
        .send({ name: "Rent", categoryType: "Expense" })
        .set({ Authorization: "Bearer abc" });
      expect(statusCode).toEqual(403);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        errors: [{ message: errorMessage.UNAUTHORIZED }]
      });
    });

    it("should insert new category", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "ADMIN_USER" });
      checkIfCategoryExist.mockResolvedValue({ rows: [{ count: 0 }] });
      insertCategory.mockResolvedValue({ rows: [{ id: 1 }] });
      const { body, statusCode } = await request(app)
        .post("/category")
        .send({ name: "Rent", categoryType: "Expense" })
        .set({ Authorization: "Bearer abc" });
      expect(statusCode).toEqual(200);
      expect(body).toEqual({
        id: 1,
        name: "Rent",
        categoryType: "Expense"
      });
    });

    it("should throw error when category already present", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "ADMIN_USER" });
      checkIfCategoryExist.mockResolvedValue({ rows: [{ count: 1 }] });
      insertCategory.mockResolvedValue({ rows: [{ id: 1 }] });
      const { body, statusCode } = await request(app)
        .post("/category")
        .send({ name: "Rent", categoryType: "Expense" })
        .set({ Authorization: "Bearer abc" });
      expect(statusCode).toEqual(409);
      expect(body).toEqual({
        code: "CONFLICT",
        errors: [{ message: errorMessage.CATEGORY_EXIST }]
      });
    });
  });

  describe("PUT /category/:id", () => {
    it("should throw error when NORMAL_USER tries to update a category", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "NORMAL_USER" });
      const { body, statusCode } = await request(app)
        .put("/category/1")
        .send({ name: "Rent", categoryType: "Expense" })
        .set({ Authorization: "Bearer abc" });
      expect(statusCode).toEqual(403);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        errors: [{ message: errorMessage.UNAUTHORIZED }]
      });
    });

    it("should update a category", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "ADMIN_USER" });
      checkIfCategoryExist.mockResolvedValue({ rows: [{ count: 1 }] });
      updateCategory.mockResolvedValue({});
      const { body, statusCode } = await request(app)
        .put("/category/1")
        .set({ Authorization: "Bearer abc" })
        .send(updateCategoryRequest);
      expect(statusCode).toEqual(200);
      expect(body).toEqual({ ...updateCategoryRequest, id: "1" });
    });

    it("should throw error when category does not exist", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "ADMIN_USER" });
      checkIfCategoryExist.mockResolvedValue({ rows: [{ count: 0 }] });
      const { body, statusCode } = await request(app)
        .put("/category/1")
        .send({ name: "Rent", categoryType: "Expense" })
        .set({ Authorization: "Bearer abc" });
      expect(statusCode).toEqual(404);
      expect(body).toEqual({
        code: "NOT_FOUND",
        errors: [{ message: errorMessage.CATEGORY_NOT_FOUND }]
      });
    });
  });

  describe("DELETE /category/:id", () => {
    it("should throw error when NORMAL_USER tries to delete a category", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "NORMAL_USER" });
      const { body, statusCode } = await request(app)
        .delete("/category/1")
        .set({ Authorization: "Bearer abc" });
      expect(statusCode).toEqual(403);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        errors: [{ message: errorMessage.UNAUTHORIZED }]
      });
    });

    it("should delete a category", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "ADMIN_USER" });
      checkIfCategoryExist.mockResolvedValue({ rows: [{ count: 1 }] });
      deleteCaregory.mockResolvedValue({});
      const { body, statusCode } = await request(app)
        .delete("/category/1")
        .set({ Authorization: "Bearer abc" });
      expect(statusCode).toEqual(200);
      expect(body).toEqual({ success: true });
    });

    it("should throw error when category does not exist", async () => {
      decryptToken.mockResolvedValue({ id: 1, role: "ADMIN_USER" });
      checkIfCategoryExist.mockResolvedValue({ rows: [{ count: 0 }] });
      const { body, statusCode } = await request(app)
        .delete("/category/1")
        .set({ Authorization: "Bearer abc" });
      expect(statusCode).toEqual(404);
      expect(body).toEqual({
        code: "NOT_FOUND",
        errors: [{ message: errorMessage.CATEGORY_NOT_FOUND }]
      });
    });
  });
});
