const changePasswordRequest = {
  type: "object",
  required: ["newPassword", "oldPassword"],
  additionalProperties: false,
  properties: {
    oldPassword: { type: "string", minLength: 6, maxLength: 20 },
    newPassword: { type: "string", minLength: 6, maxLength: 20 }
  }
};

module.exports = { changePasswordRequest };
