const {
  getCategoriesByType,
  createCategory,
  updateCategoryDetails,
  removeCategory,
  checkForCategory
} = require("../../repository/category/categoryRepository");

const AlreadyExistError = require("../../errors/AlreadyExist");
const NotFoundError = require("../../errors/NotFound");
const { errorMessage } = require("../../utils/constants/response");

const getCategoriesService = async categoryType =>
  getCategoriesByType(categoryType);

const createCategoryService = async ({ name, categoryType }) => {
  const categoryExists = await checkForCategory("name", name);
  if (categoryExists.rows[0].count > 0) {
    throw new AlreadyExistError(errorMessage.CATEGORY_EXIST);
  }
  const result = await createCategory({ name, categoryType });
  return result;
};

const updateCategoryService = async ({ id, name, categoryType }) => {
  const categoryExists = await checkForCategory("id", id);
  if (+categoryExists.rows[0].count === 0) {
    throw new NotFoundError(errorMessage.CATEGORY_NOT_FOUND);
  }
  return updateCategoryDetails({ id, name, categoryType });
};

const removeCategoryService = async id => {
  const categoryExists = await checkForCategory("id", id);
  if (+categoryExists.rows[0].count === 0) {
    throw new NotFoundError(errorMessage.CATEGORY_NOT_FOUND);
  }
  return removeCategory(id);
};

module.exports = {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  removeCategoryService
};
