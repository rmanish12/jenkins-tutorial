const { sign } = require("jsonwebtoken");
const { issueToken } = require("../jwt");

jest.mock("jsonwebtoken");

describe("JWT helper test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a jwt token", () => {
    sign.mockImplementation(() => "token");
    const result = issueToken({ email: "test@example.com" });
    expect(result).toEqual({ token: "token" });
  });
});
