const {
  getCategoriesByType,
  createCategory,
  updateCategoryDetails,
  removeCategory
} = require("../categoryRepository");

const {
  getCategories,
  insertCategory,
  updateCategory,
  deleteCaregory
} = require("../dbHelper");

const {
  getCategoriesResponse
} = require("../../../__mock__/category/categoryMockData");

jest.mock("../dbHelper");

describe("Category repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get categories by type", async () => {
    getCategories.mockResolvedValue({ rows: getCategoriesResponse });
    const result = await getCategoriesByType("income");
    expect(getCategories).toHaveBeenCalledWith("INCOME");
    expect(result).toEqual(getCategoriesResponse);
  });

  it("should insert new category", async () => {
    insertCategory.mockResolvedValue({ rows: [{ id: 1 }] });
    const result = await createCategory({
      name: "Salary",
      categoryType: "Income"
    });
    expect(insertCategory).toHaveBeenCalledWith({
      name: "Salary",
      categoryType: "INCOME"
    });
    expect(result).toEqual({
      id: 1,
      name: "Salary",
      categoryType: "Income"
    });
  });

  it("should update category", async () => {
    updateCategory.mockResolvedValue({});
    const result = await updateCategoryDetails({
      id: "1",
      name: "Salary1",
      categoryType: "Income"
    });
    expect(updateCategory).toHaveBeenCalledWith({
      id: "1",
      name: "Salary1",
      categoryType: "INCOME"
    });
    expect(result).toEqual({
      id: "1",
      name: "Salary1",
      categoryType: "Income"
    });
  });

  it("should delete category", async () => {
    deleteCaregory.mockResolvedValue({});
    await removeCategory(1);
    expect(deleteCaregory).toHaveBeenCalledWith(1);
  });
});
