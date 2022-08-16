const client = require("../../db");

const getCategories = async categoryType =>
  client.query("SELECT id, name from categories where category = $1", [
    categoryType
  ]);

const insertCategory = async ({ name, categoryType }) =>
  client.query(
    "INSERT into categories(name, category) values($1, $2) RETURNING ID",
    [name, categoryType]
  );

const checkIfCategoryExist = async (fieldName, fieldValue) =>
  client.query(`SELECT count(*) FROM categories where ${fieldName} = $1`, [
    fieldValue
  ]);

const updateCategory = async ({ id, name, categoryType }) =>
  client.query("UPDATE categories SET name = $1, category = $2 where id = $3", [
    name,
    categoryType,
    id
  ]);

const deleteCaregory = async id =>
  client.query("DELETE from categories where id = $1", [id]);

module.exports = {
  getCategories,
  insertCategory,
  updateCategory,
  checkIfCategoryExist,
  deleteCaregory
};
