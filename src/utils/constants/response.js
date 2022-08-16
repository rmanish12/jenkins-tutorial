const errorCode = {
  CONFLICT: "CONFLICT",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NOT_FOUND: "NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  UNAUTHORIZED: "UNAUTHORIZED"
};
const errorMessage = {
  USER_EXIST: "User with the given details already exists",
  INTERNAL_SERVER_ERROR:
    "Some internal error occurred. Please try again in sometime",
  CREDENTIAL_ERROR: "User with the given details does not exist",
  ACCOUNT_LOCKED: "Account is temporarily locked",
  UNAUTHENTICATED: "Unautheticated",
  UNAUTHORIZED: "You don't have sufficient permission for this",
  CATEGORY_EXIST: "Given category already exist",
  CATEGORY_NOT_FOUND: "No such category exist"
};

module.exports = { errorMessage, errorCode };
