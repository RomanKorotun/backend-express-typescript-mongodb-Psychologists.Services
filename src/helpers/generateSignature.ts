import * as crypto from "crypto";

function generateSignature(encodedData: string, privateKey: string) {
  // Формуємо рядок для підпису: privateKey + encodedData + privateKey
  const signString = privateKey + encodedData + privateKey;

  // Створюємо SHA1 хеш підпису
  const sha1Hash = crypto.createHash("sha1");
  sha1Hash.update(signString);

  // Підпис у форматі base64
  const signature = sha1Hash.digest("base64");

  return signature;
}

export default generateSignature;
