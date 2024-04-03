const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const _ = require("lodash");
const path = require("path");

const rateLimit = require("express-rate-limit");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4242;

app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 80, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(limiter);

app.get("/randomize", async (req, res) => {
  console.log("I'm in randomize");

  const ingredients = req.query?.ingredients?.join(",+");

  let apiEndPoint;

  if (ingredients) {
    apiEndPoint = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${ingredients}&number=1`;
  } else {
    apiEndPoint = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=1`;
  }
  axios
    .get(apiEndPoint)
    .then(async (response) => {
      if (!_.isEmpty(response.data)) {
        const recipeData = ingredients
          ? response.data[0]
          : response.data.recipes[0];
        const apiRecipeInfoEndPoint = `https://api.spoonacular.com/recipes/${recipeData.id}/information?apiKey=${process.env.API_KEY}&includeNutrition=true`;
        axios
          .get(apiRecipeInfoEndPoint)
          .then((response) => {
            return res.send({
              recipeData,
              recipeInformation: response.data,
            });
          })
          .catch((error) => {
            return res.send(error);
          });
      } else {
        //return error no recipe found to catch
        return res.status(404).send("No recipe found");
      }
    })
    .catch((error) => {
      return res.send(error);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4242");
});
