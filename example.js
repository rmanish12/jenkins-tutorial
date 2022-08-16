// const fs = require("fs");
// const crypto = require("crypto");

// const encryptText = plainText =>
//   crypto.publicEncrypt(
//     {
//       key: fs.readFileSync("public_key.pem", "utf8"),
//       padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//       oaepHash: "sha256"
//     },
//     Buffer.from(plainText)
//   );

// const res = encryptText("abc123");
// console.log("res: ", res);
// console.log("********");
// console.log(res.toString("base64"));

// const decryptText = text => {
//   const decyptedBuffer = crypto.privateDecrypt(
//     {
//       key: fs.readFileSync("private_key.pem", "utf8"),
//       padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//       oaepHash: "sha256"
//     },
//     text
//   );
//   return decyptedBuffer.toString();
// };

// const result = decryptText();
// console.log(result);
