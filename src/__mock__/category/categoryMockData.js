const getCategoriesResponse = [
  {
    id: "1",
    name: "Income"
  },
  {
    id: "2",
    name: "Bonus"
  }
];

const createCateoryRepoResponse = {
  id: 1,
  name: "Salary",
  categoryType: "Income"
};

const updateCategoryRequest = {
  name: "Salary",
  categoryType: "Income"
};

module.exports = {
  getCategoriesResponse,
  createCateoryRepoResponse,
  updateCategoryRequest
};
