const getCategoryRequest = {
  type: "object",
  required: ["categoryType"],
  additionalProperties: false,
  properties: {
    categoryType: { type: "string", enum: ["income", "expense"] }
  }
};

const createCategoryRequest = {
  type: "object",
  required: ["name", "categoryType"],
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    categoryType: { type: "string", enum: ["Income", "Expense"] }
  }
};

const updateCategoryParams = {
  type: "object",
  required: ["id"],
  additionalProperties: false,
  properties: {
    id: { type: "string" }
  }
};

module.exports = {
  getCategoryRequest,
  createCategoryRequest,
  updateCategoryParams
};
