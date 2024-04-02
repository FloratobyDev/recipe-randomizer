import React, { useEffect, useRef, useState } from "react";
import image from "./asset/image.png";
import H2 from "./components/H2";
import InstructionStep from "./InstructionStep";
import { RecipeInformation } from "./types";
import { useReactToPrint } from "react-to-print";

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
    return (
      <div className="flex h-full justify-center items-center flex-col lg:w-[25%] md:w-[36%] xl:w[16%] mx-auto">
        <p>Loading</p>
      </div>
    );
  }

  if (noRecipeFoundError) {
    return (
      <div className="flex h-full justify-center items-center flex-col px-2 lg:w-[24%] md:w-[36%] xl:w[16%] mx-auto">
        <img className="w-64 h-64" src={image} alt="image" />
        <h4 className=" text-center font-jost py-2">
          No recipe found. Please try again.
        </h4>
      </div>
    );
  }

  if (data) {
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
          <div className="flex flex-col items-center gap-y-0.5 mb-6">
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
            {!printing && (
              <div className="flex gap-x-2 self-start mr-2">
                <button
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
                  {hasAdded ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 12L18 12"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12H20M12 4V20"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <button onClick={handlePrint}>
                  <svg
                    fill="#000000"
                    height="24px"
                    width="24px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 64 64"
                    enableBackground="new 0 0 64 64"
                    xmlSpace="preserve"
                  >
                    <g id="Printer">
                      <path
                        d="M57.7881012,14.03125H52.5v-8.0625c0-2.2091999-1.7909012-4-4-4h-33c-2.2091999,0-4,1.7908001-4,4v8.0625H6.2119002
		C2.7871001,14.03125,0,16.8183498,0,20.2431507V46.513649c0,3.4248009,2.7871001,6.2119026,6.2119002,6.2119026h2.3798995
		c0.5527,0,1-0.4472008,1-1c0-0.5527-0.4473-1-1-1H6.2119002C3.8896,50.7255516,2,48.8359489,2,46.513649V20.2431507
		c0-2.3223,1.8896-4.2119007,4.2119002-4.2119007h51.5762024C60.1102982,16.03125,62,17.9208508,62,20.2431507V46.513649
		c0,2.3223-1.8897018,4.2119026-4.2118988,4.2119026H56c-0.5527992,0-1,0.4473-1,1c0,0.5527992,0.4472008,1,1,1h1.7881012
		C61.2128983,52.7255516,64,49.9384499,64,46.513649V20.2431507C64,16.8183498,61.2128983,14.03125,57.7881012,14.03125z
		 M13.5,5.96875c0-1.1027999,0.8971996-2,2-2h33c1.1027985,0,2,0.8972001,2,2v8h-37V5.96875z"
                      />
                      <path
                        d="M44,45.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,47.0302505,20,47.0302505h24
		c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,45.0322495,44,45.0322495z"
                      />
                      <path
                        d="M44,52.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,54.0302505,20,54.0302505h24
		c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,52.0322495,44,52.0322495z"
                      />
                      <circle cx="7.9590998" cy="21.8405495" r="2" />
                      <circle cx="14.2856998" cy="21.8405495" r="2" />
                      <circle cx="20.6121998" cy="21.8405495" r="2" />
                      <path d="M11,62.03125h42v-26H11V62.03125z M13.4036999,38.4349518h37.1925964v21.1925964H13.4036999V38.4349518z" />
                    </g>
                  </svg>
                </button>
              </div>
            )}
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
