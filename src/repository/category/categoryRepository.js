const {
  getCategories,
  insertCategory,
  checkIfCategoryExist,
  updateCategory,
  deleteCaregory
} = require("./dbHelper");

const getCategoriesByType = async categoryType => {
  const result = await getCategories(categoryType.toUpperCase());
  return result.rows;
};

const createCategory = async ({ name, categoryType }) => {
  const result = await insertCategory({
    name,
    categoryType: categoryType.toUpperCase()
  });
  return { id: result.rows[0].id, name, categoryType };
};

const updateCategoryDetails = async ({ id, name, categoryType }) => {
  await updateCategory({ id, name, categoryType: categoryType.toUpperCase() });
  return { id, name, categoryType };
};

const removeCategory = async id => deleteCaregory(id);

const checkForCategory = async (fieldName, fieldValue) =>
  checkIfCategoryExist(fieldName, fieldValue);

module.exports = {
  getCategoriesByType,
  createCategory,
  updateCategoryDetails,
  removeCategory,
  checkForCategory
};
