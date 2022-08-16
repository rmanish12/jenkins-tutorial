const registerUserRequestBodySchema = {
  type: "object",
  required: ["email", "password", "firstName", "lastName", "gender"],
  additionalProperties: false,
  properties: {
    email: { type: "string" },
    password: { type: "string", minLength: 6, maxLength: 20 },
    firstName: { type: "string" },
    lastName: { type: "string" },
    gender: {
      type: "string",
      enum: ["MALE", "FEMALE", "OTHERS"]
    }
  }
};

module.exports = {
  registerUserRequestBodySchema
};
