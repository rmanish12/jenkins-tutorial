const { decryptText } = require("./encryption");

exports.matchPassword = (userPassword, enteredPassword) => {
  const decryptedUserPass = decryptText(userPassword)();
  // const decryptedEnteredPass = decryptText(enteredPassword)();

  return decryptedUserPass === enteredPassword;
};
