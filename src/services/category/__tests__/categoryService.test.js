const {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  removeCategoryService
} = require("../categoryService");
const {
  getCategoriesByType,
  createCategory,
  updateCategoryDetails,
  removeCategory,
  checkForCategory
} = require("../../../repository/category/categoryRepository");
const {
  createCateoryRepoResponse
} = require("../../../__mock__/category/categoryMockData");

jest.mock("../../../repository/category/categoryRepository");

describe("Category Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all categories by type", async () => {
    getCategoriesByType.mockResolvedValue({});
    await getCategoriesService("income");
    expect(getCategoriesByType).toHaveBeenCalledWith("income");
  });

  it("should insert new category", async () => {
    checkForCategory.mockResolvedValue({ rows: [{ count: 0 }] });
    createCategory.mockResolvedValue(createCateoryRepoResponse);
    const result = await createCategoryService({
      name: "Salary",
      categoryType: "Income "
    });
    expect(result).toEqual(createCateoryRepoResponse);
  });

  it("should update existing category", async () => {
    checkForCategory.mockResolvedValue({ rows: [{ count: 1 }] });
    updateCategoryDetails.mockResolvedValue({});
    await updateCategoryService(createCateoryRepoResponse);
    expect(updateCategoryDetails).toHaveBeenCalledWith(
      createCateoryRepoResponse
    );
  });

  it("should delete existing category", async () => {
    checkForCategory.mockResolvedValue({ rows: [{ count: 1 }] });
    removeCategory.mockResolvedValue({});
    await removeCategoryService(1);
    expect(removeCategory).toHaveBeenCalledWith(1);
  });
});
