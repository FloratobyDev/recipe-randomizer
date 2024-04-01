import React from "react";
import image from "./asset/image.png";
import lemonCake from "./asset/lemon_cake.jpg";
import H2 from "./components/H2";
import InstructionStep from "./InstructionStep";

type Props = {
  data: any;
  loading: boolean;
};

function Recipe({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="flex h-full justify-center items-center flex-col lg:w-[25%] md:w-[36%] xl:w[16%] mx-auto">
        <p>Loading</p>
      </div>
    );
  }

  if (data) {
    console.log("data", data);

    const { recipeInformation } = data;

    const instructionSteps = recipeInformation.analyzedInstructions.flatMap(
      (instruction: any) => instruction.steps //steps is an array of objects
    );

    const preparationMinutes =
      recipeInformation.preparationMinutes < 0
        ? "N/A"
        : recipeInformation.preparationMinutes;
    const cookingMinutes =
      recipeInformation.cookingMinutes < 0
        ? "N/A"
        : recipeInformation.cookingMinutes;
    const servings =
      recipeInformation.servings < 0 ? "N/A" : recipeInformation.servings;
    const sourceName = recipeInformation.sourceName
      ? recipeInformation.sourceName
      : "N/A";

    return (
      <div className="flex flex-col lg:w-[30%] md:w-[36%] xl:w[16%] mx-auto px-4 relative md:left-2">
        <div className="flex flex-col md:flex-row gap-x-10 w-full mb-4">
          <div className="flex flex-col items-center gap-y-1">
            <div className="w-64 h-64 md:w-44 md:h-44 rounded-full overflow-hidden">
              <img
                src={recipeInformation.image}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <p className="font-jost">
              <span className="font-bold">{Math.round(recipeInformation.spoonacularScore)}</span> out
              of <span className="font-bold">100</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-y-0.5 mb-6">
            <H2 bold>{recipeInformation.title}</H2>
            <div className="text-start indent-2 self-start font-jost">
              <p>
                <span className="font-bold">Prep time: </span>
                {preparationMinutes}
              </p>
              <p>
                <span className="font-bold">Cook time: </span>
                {cookingMinutes}
              </p>
              <p>
                <span className="font-bold">Servings: </span>
                {servings}
              </p>
              <p>
                <span className="font-bold">Source Name: </span>
                {sourceName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <H2 bold>Ingredients</H2>
          <div className="indent-2 font-jost">
            {recipeInformation.extendedIngredients.map((ingredient: any) => (
              <p key={ingredient.id}>
                {ingredient.amount} {ingredient.unit}{" "}
                {ingredient.nameClean || ingredient.originalName}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <H2 bold>Instructions</H2>
          <InstructionStep instructions={instructionSteps} />
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <H2 bold>Nutritions</H2>
          {recipeInformation.nutrition.nutrients.map((nutrition: any) => {
            const selectNutritions = [
              "Calories",
              "Fat",
              "Carbohydrates",
              "Protein",
            ];

            if (selectNutritions.includes(nutrition.name)) {
              return (
                <p className="font-jost" key={nutrition.name}>
                  {nutrition.name}: {nutrition.amount} {nutrition.unit}
                </p>
              );
            }
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full justify-center items-center flex-col px-2 lg:w-[24%] md:w-[36%] xl:w[16%] mx-auto">
      <img className="w-64 h-64" src={image} alt="image" />
      <h2 className="text-4xl font-bold font-courgette">Chef Rand</h2>
      <h4 className=" text-center font-jost py-2">
        A recipe randomizer app offers a creative way to discover new meals by
        generating random recipes based on ingredients you have at home or wish
        to explore.
      </h4>
    </div>
  );
}

export default Recipe;
