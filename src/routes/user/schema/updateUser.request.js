const updateUserRequest = {
  type: "object",
  required: ["email", "firstName", "lastName", "gender"],
  additionalProperties: false,
  properties: {
    email: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    gender: {
      type: "string",
      enum: ["MALE", "FEMALE", "OTHERS"]
    }
  }
};

module.exports = { updateUserRequest };
