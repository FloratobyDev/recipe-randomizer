import React, { useEffect, useRef, useState } from "react";
import H2 from "../components/H2";
import image from "../asset/image.png";
import InstructionStep from "../InstructionStep";
import { RecipeInformation } from "../types";
import { useReactToPrint } from "react-to-print";
import MinusLogo from "../svgs/MinusLogo";
import PlusLogo from "../svgs/PlusLogo";
import RecipeLoading from "./RecipeLoading";
import NoRecipeFoundError from "./NoRecipeFoundError";
import PrintLogo from "src/svgs/PrintLogo";

type Props = {
  data: RecipeInformation | null;
  loading: boolean;
  savedRecipes: RecipeInformation[];
  onSave: (recipeData: RecipeInformation) => void;
  onRemove: (id: number) => void;
  noRecipeFoundError: boolean;
};

function Recipe({
  data,
  loading,
  onSave,
  savedRecipes,
  onRemove,
  noRecipeFoundError,
}: Props) {
  const [hasAdded, setHasAdded] = useState(false);
  const [printing, setPrinting] = useState(false);
  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);

  useEffect(() => {
    if (!data) return;
    const hasDataIdSaved = savedRecipes.some(
      (recipe) => recipe.recipeInformation.id === data?.recipeInformation.id
    );
    if (hasDataIdSaved) {
      setHasAdded(true);
    }
  }, [data]);

  useEffect(() => {
    if (
      printing === true &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, printing]);

  const handleAfterPrint = React.useCallback(() => {
    setPrinting(false);
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    setPrinting(true);
    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
    });
  }, []);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Recipe Printout",
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  if (loading) {
    return <RecipeLoading />;
  }

  console.log("noRecipeFoundError", noRecipeFoundError);

  if (!data) {
    return <NoRecipeFoundError />;
  }

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

  const selectedData: RecipeInformation = {
    recipeInformation: {
      id: recipeInformation.id,
      title: recipeInformation.title,
      image: recipeInformation.image,
      preparationMinutes: recipeInformation.preparationMinutes,
      cookingMinutes: recipeInformation.cookingMinutes,
      servings: recipeInformation.servings,
      sourceName,
      spoonacularScore: recipeInformation.spoonacularScore,
      extendedIngredients: recipeInformation.extendedIngredients,
      analyzedInstructions: recipeInformation.analyzedInstructions,
      nutrition: recipeInformation.nutrition,
    },
  };

  return (
    <div
      ref={componentRef}
      className="flex flex-col lg:w-[30%] md:w-[36%] xl:w[16%] mx-auto px-4 relative md:left-2"
    >
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
            <span className="font-bold">
              {Math.round(recipeInformation.spoonacularScore)}
            </span>{" "}
            out of <span className="font-bold">100</span>
          </p>
        </div>
        <div
          className="flex flex-col items-center gap-y-0.5 mb-6"
          data-testid="recipe-name"
        >
          <H2 bold>{recipeInformation.title}</H2>
          <div className="text-start self-start font-jost">
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
          <div className="flex gap-x-2 self-start mr-2">
            <button
              data-testid="save-button"
              onClick={() => {
                if (hasAdded) {
                  setHasAdded(false);
                  onRemove(selectedData.recipeInformation.id);
                } else {
                  setHasAdded(true);
                  onSave(selectedData);
                }
              }}
            >
              {hasAdded ? <PlusLogo /> : <MinusLogo />}
            </button>
            <button onClick={handlePrint}>
              <PrintLogo />
            </button>
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

export default Recipe;
