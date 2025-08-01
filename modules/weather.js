// modules/weather.js
import fetch from "node-fetch";

async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    city: data.location.name,
    condition: data.current.condition.text,
    temp_c: data.current.temp_c
  };
}

export default { getWeather };
