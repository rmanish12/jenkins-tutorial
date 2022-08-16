const router = require("express").Router();
const { validateSchema } = require("../../config/ajv");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../../controller/category/categoryController");
const { checkForAdminRole } = require("../../middlewares/authorization");
const {
  getCategoryRequest,
  createCategoryRequest,
  updateCategoryParams
} = require("./schema/category.request");

router.get(
  "/:categoryType",
  validateSchema([{ data: "params", schema: getCategoryRequest }]),
  getCategories
);

router.post(
  "/",
  [
    checkForAdminRole,
    validateSchema([{ data: "body", schema: createCategoryRequest }])
  ],
  createCategory
);

router.put(
  "/:id",
  [
    checkForAdminRole,
    validateSchema([{ data: "params", schema: updateCategoryParams }]),
    validateSchema([{ data: "body", schema: createCategoryRequest }])
  ],
  updateCategory
);

router.delete(
  "/:id",
  [
    checkForAdminRole,
    validateSchema([{ data: "params", schema: updateCategoryParams }])
  ],
  deleteCategory
);

module.exports = router;
