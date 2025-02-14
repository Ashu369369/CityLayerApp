import CryptoJS from 'crypto-js';

// 32-byte key (must be exactly 32 characters for AES-256)
// const SECRET_KEY = CryptoJS.enc.Utf8.parse("0123456789abcdef0123456789abcdef"); 
const SECRET_KEY = process.env.SECRET_KEY
// 16-byte IV (must be exactly 16 characters)
// const IV = CryptoJS.enc.Utf8.parse("abcdef9876543210"); 
const IV = process.env.IV; 

// Encrypt function
export const encryptAES = (plainText: string): string => {
    const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};

// Decrypt function
export const decryptAES = (cipherText: string): string => {
    const decrypted = CryptoJS.AES.decrypt(cipherText, SECRET_KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};
