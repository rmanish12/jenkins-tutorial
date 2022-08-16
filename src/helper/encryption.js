const fs = require("fs");
const crypto = require("crypto");

const encryptText = plainText => {
  const encryptedData = crypto.publicEncrypt(
    {
      key: fs.readFileSync("public_key.pem", "utf8"),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256"
    },
    Buffer.from(plainText)
  );
  return encryptedData.toString("base64");
};

// encryptedText.toString("base64")

// const getEncryptionDetails = () => {
//   const publicKey = fs.readFileSync("public_key.pem", "utf8");
//   return {
//     alg: "RSA",
//     enc: "base64",
//     hash: "sha256",
//     pad: "PKCS1_OAEP_PADDING",
//     key: publicKey.substring(27, publicKey.length - 26).replace("\n", "")
//   };
// };

const decryptText = text => {
  const encryptedBuffer = Buffer.from(text, "base64");
  return () => {
    const decryptedText = crypto.privateDecrypt(
      {
        key: fs.readFileSync("private_key.pem", "utf8"),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
      },
      encryptedBuffer
    );
    return decryptedText.toString();
  };
};

module.exports = {
  encryptText,
  // getEncryptionDetails,
  decryptText
};
