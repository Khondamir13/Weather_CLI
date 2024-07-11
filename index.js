// process.argv yordamida command line interface bbilan ishlashimiz mumkin
// Narsalar yozishimiz mumkin u bizga keyin massiv qaytarib beradi
import getArgs from "./helpers/args.js"; // const getArgs = require("./helpers/args"); bunday chaqirishning zamanoviy usuli
import { getIcons, getWeather } from "./services/api.service.js";
import {
  printError,
  printSuccess,
  printHelp,
  printWeather,
} from "./services/log.service.js";
import {
  getKeyValue,
  saveKeyvalue,
  TOKEN_DICTIONARY,
} from "./services/storage.service.js";
const saveToken = async (token_value) => {
  if (!token_value.length) {
    printError("Token does not exist");
    return;
  }
  try {
    await saveKeyvalue(TOKEN_DICTIONARY.token, token_value);
    printSuccess("Token was saved");
  } catch (error) {
    printError(error.message);
  }
};
const saveCity = async (city_value) => {
  if (!city_value.length) {
    printError("City does not exist");
    return;
  }
  try {
    await saveKeyvalue(TOKEN_DICTIONARY.city, city_value);
    printSuccess("City was saved");
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const city = (await getKeyValue(TOKEN_DICTIONARY.city)) ?? "Uzbekistan";
    const response = await getWeather(city);
    printWeather(response, getIcons(response.weather[0].icon));
  } catch (error) {
    if (error?.response?.status == 404) {
      printError("City not found");
    } else if (error?.response?.status == 401) {
      printError("Invalid token");
    } else {
      printError(error.message);
    }
  }
};
const startCli = () => {
  const agrs = getArgs(process.argv);
  if (agrs.h) {
    // help
    return printHelp();
  }

  if (agrs.s) {
    // save city
    return saveCity(agrs.s);
  }

  if (agrs.t) {
    //save token
    return saveToken(agrs.t);
  }

  // result
  getForcast();
};

startCli();
