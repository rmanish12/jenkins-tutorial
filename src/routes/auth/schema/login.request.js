const loginRequestBodySchema = {
  type: "object",
  required: ["email", "password"],
  additionalProperties: false,
  properties: {
    email: { type: "string" },
    password: { type: "string", minLength: 6, maxLength: 20 }
  }
};

module.exports = { loginRequestBodySchema };
