import chalk from "chalk"; // kutubxona=> command linedagi codelarimizga qandaydir ranglar berishda ishlatsak boladi
import dedent from "dedent-js";
const printError = (error) => {
  console.log(chalk.bgRed("ERROR") + " " + error);
};
const printSuccess = (message) => {
  console.log(chalk.bgGreen("Success") + " " + message);
};

const printHelp = () => {
  console.log(dedent` 
        ${chalk.bgCyan("HELP")} 
        -s [CITY] for install city
        -h for help
        -t [API_KEY] for saving token
    `); // dedent chetdagi bosh joylarni yoq qilib beradi
};

const printWeather = (response, icon) => {
  console.log(dedent`
    ${chalk.bgYellowBright("WEATHER")} City weather ${response.name} 
    ${icon} ${response.weather[0].description}
    Temperature: ${response.main.temp} (feels like) ${response.main.feels_like}
    Humidity: ${response.main.humidity}%
    Wind speed: ${response.wind.speed}
  `);
};
export { printError, printSuccess, printHelp, printWeather }; // agar package filedan  type:module  qiladigan bolsak module sozini ishlatmaymiz
