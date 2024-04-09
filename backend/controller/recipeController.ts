import { Request, Response } from "express";
import axios from "axios";
const controller = {
  getRecipes: async (req: Request, res: Response) => {
    const { ingredients } = req.query;
    let ingredientString: string = ingredients as string; // Explicitly define as string array

    if (Array.isArray(ingredients)) {
      ingredientString = ingredients.join(",+");
    }

    let apiEndPoint = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=1`;

    if (ingredientString) {
      apiEndPoint = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${ingredients}&number=1`;
    }

    function isEmpty(value) {
      if (Array.isArray(value) && value.length <= 0) {
        return true;
      } else if (Object.keys(value).length <= 0) {
        return true;
      }
      return false;
    }

    axios
      .get(apiEndPoint)
      .then(async (response) => {
        console.log("response", response.data);
        if (!isEmpty(response.data)) {
          console.log("response.data", response.data);

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
          console.log("No recipe found");
          return res.status(404).send("No recipe found");
        }
      })
      .catch((error) => {
        return res.status(404).send(error);
      });
  },
};

export default controller;
