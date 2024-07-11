import os from "os";
import path from "path";
import fs from "fs";
const filePath = path.join(os.homedir(), "weather-data.json");
const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};
const saveKeyvalue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await fs.promises.writeFile(filePath, JSON.stringify(data)); // bu promisses yordamida hamma narsani qilishimiz mumkin write, read shu kabi bu unversaldir
};
const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};
// file bor yoqligini tekshirib berish functioni
const isExist = async (path) => {
  try {
    await fs.promises.stat(path); // stat degan methodi filening bor yoki yoqligini aniqlab beradi
    return true;
  } catch (error) {
    return false;
  }
};
export { saveKeyvalue, getKeyValue, TOKEN_DICTIONARY };
