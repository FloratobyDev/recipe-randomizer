const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4242;

app.get("/randomize", async (req, res) => {
  console.log(req.query);
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
      if (!!response.data) {

        const recipeData = ingredients ? response.data[0]: response.data.recipes[0];
        const apiRecipeInfoEndPoint = `https://api.spoonacular.com/recipes/${recipeData.id}/information?apiKey=${process.env.API_KEY}&includeNutrition=true`;
        console.log('apiRecipeInfoEndPoint', apiRecipeInfoEndPoint);
        axios
          .get(apiRecipeInfoEndPoint)
          .then((response) => {
            console.log("response.data info", response.data);
            return res.send({
              recipeData,
              recipeInformation: response.data,
            });
          })
          .catch((error) => {
            console.log("error", error);
            return res.send(error);
          });
      } else {
        throw new Error("No recipe found");
      }
    })
    .catch((error) => {
      console.log("error", error);
      return res.send(error);
    });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4242");
});
