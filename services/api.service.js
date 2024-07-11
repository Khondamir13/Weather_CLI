// import https from "https"; // turli xil global api larga so'rov yuborishda ishlatiladi
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";

const getIcons = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "*";
    case "02":
      return "🌤";
    case "09":
      return "🌧";
    case "10":
      return "🌦";
    case "11":
      return "";
    case "13":
      return "❄️";
  }
};
const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error("API does not exist, -t [API_KEY] for saving token");
  }
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  // lat, va lon => geolocation hisoblanadi qaysidir shahrning yokida joyning qayerdan qacha masofaqa joylashganliklari cordinatalari
  //   http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
  // biz foydalanuvchining lat va lon gini bilmaganimiz uchun, tepadagi q={city name} dan foydalanamiz, bu kiritilgan shaharning lat vwa lon automatically kiritilgan bo'ladi

  // // So'rov yuborishning eski usuli
  //   const url = new URL("https://api.openweathermap.org/data/2.5/weather"); // asosiy url shu hisoblanadi, lat, lo,appid lar esa parametrlar hisoblanadi

  //   url.searchParams.append("q", city);
  //   url.searchParams.append("appid", token);
  //   url.searchParams.append("lang", "en");
  //   url.searchParams.append("units", "metric");
  //   https.get(url, (response) => {
  //     // yuborilgan so'rovning javobi call back functionga keladi
  //     let res = "";
  //     response.on("data", (chunk) => {
  //       // data kelganda ishga tushadi
  //       res += chunk;
  //     });
  //     response.on("end", () => {
  //       // hamma narsa yakunlangandan keyin ishga tushadi
  //       console.log(res);
  //     });
  //   });

  // hozirgi kunda AXIOS kutubxonasidan foydalanamiz shu kabi so'rovlarni bajarish uchun
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "en",
        units: "metric",
      },
    }
  );
  return data;
};
export { getWeather, getIcons };
