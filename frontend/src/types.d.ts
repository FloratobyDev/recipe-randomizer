export type RecipeInformation = {
  recipeInformation: {
    id: number;
    title: string;
    image: string;
    preparationMinutes: number;
    cookingMinutes: number;
    servings: number;
    sourceName: string;
    spoonacularScore: number;
    extendedIngredients: any[];
    analyzedInstructions: any[];
    nutrition: {
      nutrients: any[];
    };
  };
};
