import express from "express";
import "dotenv/config";
import artic from "./modules/artic.js";
import weather from "./modules/weather.js";

const app = express();
const port = 8888;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "WanderArt" });
});

app.post("/results", async (req, res) => {
  const city = req.body.city;
  const weatherData = await weather.getWeather(city);
  const artData = await artic.getArtworks();

  const suggestions = weatherData.condition.includes("rain") || weatherData.condition.includes("snow")
    ? "Visit indoor galleries."
    : "Explore outdoor murals and public art.";

  res.render("results", {
    title: `WanderArt in ${city}`,
    weather: weatherData,
    art: artData,
    suggestions
  });
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
