const router = require("express").Router();
const { validateSchema } = require("../../config/ajv");
const authenticateUser = require("../../middlewares/authentication");
const { registerUserRequestBodySchema } = require("./schema/register.request");
const { loginRequestBodySchema } = require("./schema/login.request");
const { changePasswordRequest } = require("./schema/changePassword.request");
const { headersWithAuthorization } = require("./schema/header");

const {
  registerUser,
  loginUser,
  changePassword
} = require("../../controller/auth/authController");

router.post(
  "/register",
  validateSchema([{ data: "body", schema: registerUserRequestBodySchema }]),
  registerUser
);

router.post(
  "/login",
  validateSchema([{ data: "body", schema: loginRequestBodySchema }]),
  loginUser
);

router.patch(
  "/changePassword",
  [
    authenticateUser,
    validateSchema([
      { data: "body", schema: changePasswordRequest },
      { data: "headers", schema: headersWithAuthorization }
    ])
  ],
  changePassword
);

module.exports = router;
