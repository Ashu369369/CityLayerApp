import CryptoJS from "crypto-js";


const SECRET_KEY = process.env.SECRET_KEY
const IV = process.env.IV; 

// Encrypt function
export const encryptAES = (plainText: string): string => {
  const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

// Decrypt function
export const decryptAES = (cipherText: string): string => {
  const decrypted = CryptoJS.AES.decrypt(cipherText, SECRET_KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
