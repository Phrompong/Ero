// import { decompress } from "./common";
import CryptoJS from "crypto-js";
// const aes256 = require("aes256");

// const password = "eNorLE8tKqkEAAlKAq0=";

export function decrypt(value) {
  var encrypted = CryptoJS.AES.decrypt(value, "qwerty");

  return encrypted.toString(CryptoJS.enc.Utf8);
}

// export function decrypt(value) {
//   const buffer = Buffer.from(value);

//   return aes256.decrypt(decompress(password), buffer);
// }
