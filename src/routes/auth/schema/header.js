const headersWithAuthorization = {
  $id: "headersWithAuthorization",
  type: "object",
  additionalProperties: true,
  required: ["authorization"],
  properties: {
    authorization: {
      type: "string",
      description: "It should contain ID token"
    }
  }
};

module.exports = { headersWithAuthorization };
