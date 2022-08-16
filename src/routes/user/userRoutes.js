const router = require("express").Router();
const { validateSchema } = require("../../config/ajv");
const { updateUserRequest } = require("./schema/updateUser.request");

const {
  getUserDetails,
  updateUser
} = require("../../controller/user/userController");

router.get("/", getUserDetails);

router.put(
  "/",
  validateSchema([{ data: "body", schema: updateUserRequest }]),
  updateUser
);

module.exports = router;
