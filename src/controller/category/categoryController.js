const { StatusCodes } = require("http-status-codes");
const logger = require("../../logger");
const {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  removeCategoryService
} = require("../../services/category/categoryService");

const getCategories = async (req, res, next) => {
  logger.info("Invoking request for getting categories");
  try {
    const { categoryType } = req.params;
    const categories = await getCategoriesService(categoryType);
    res.status(StatusCodes.OK).send(categories);
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  const { name, categoryType } = req.body;
  logger.info("Invoking request for creating category: ", name);
  try {
    const newCategory = await createCategoryService({ name, categoryType });
    res.status(StatusCodes.OK).send(newCategory);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  const { name, categoryType } = req.body;
  const { id } = req.params;
  logger.info("Invoking request for updating category: ", name);
  try {
    const updatedCategory = await updateCategoryService({
      id,
      name,
      categoryType
    });
    res.status(StatusCodes.OK).send(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  logger.info("Invoking request for deleting category: ", id);
  try {
    await removeCategoryService(id);
    res.status(StatusCodes.OK).send({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
