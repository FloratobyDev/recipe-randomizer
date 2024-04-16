import React, { useEffect, useRef, useState } from "react";
import Search from "./components/Search";
import Button from "./components/Button";
import axios from "axios";
import BrandButton from "./components/BrandButton";
import DropdownButton from "./components/DropdownButton";
const Recipe = React.lazy(() => import("./recipe/Recipe"));
import { RecipeInformation } from "./types";
import PrintLogo from "./svgs/PrintLogo";
import NoRecipe from "./recipe/NoRecipe";

function App() {
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const [recipeData, setRecipeData] = useState<RecipeInformation>(null);
  const [loading, setLoading] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [noRecipeFoundError, setNoRecipeFoundError] = useState(false);

  useEffect(() => {
    const indexedDB = window.indexedDB;
    const request = indexedDB.open("recipe", 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      db.createObjectStore("recipe", { keyPath: "id" });
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction("recipe", "readwrite");
      const recipeStore = transaction.objectStore("recipe");
      const request = recipeStore.getAll();

      request.onsuccess = (event: any) => {
        const results = event.target.result;
        const recipes = results.map((result) => result.recipe);
        setSavedRecipes(recipes);
      };
    };
  }, []);

  function handleRandomize() {
    setLoading(true);
    setNoRecipeFoundError(false);
    axios
      .get("/randomize", {
        params: {
          ingredients: listOfIngredients,
        },
      })
      .then((res) => {
        setRecipeData(res.data);
      })
      .catch((err) => {
        console.log("No recipe found error", err.response);
        setNoRecipeFoundError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  console.count("App rendered");

  function addDataIndexedDB(data: RecipeInformation) {
    const indexedDB = window.indexedDB;
    const request = indexedDB.open("recipe", 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("recipe", "readwrite");
      const recipeStore = transaction.objectStore("recipe");
      recipeStore.add({ id: data.recipeInformation.id, recipe: data });
    };
  }

  function removeDataIndexedDB(id: number) {
    const indexedDB = window.indexedDB;
    const request = indexedDB.open("recipe", 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("recipe", "readwrite");
      const recipeStore = transaction.objectStore("recipe");
      recipeStore.delete(id);
    };
  }

  async function onSave(recipeData: RecipeInformation) {
    setSavedRecipes([...savedRecipes, recipeData]);
    await addDataIndexedDB(recipeData);
  }

  async function onRemove(id: number) {
    setSavedRecipes(
      savedRecipes.filter((recipe) => recipe.recipeInformation.id !== id)
    );
    await removeDataIndexedDB(id);
  }

  function onSelectRecipe(recipe: RecipeInformation) {
    setNoRecipeFoundError(false);
    setRecipeData(recipe);
  }

  const isMobile = window.innerWidth < 768;

  return (
    <div className=" bg-primary h-screen flex">
      <div className="w-full h-full flex flex-col">
        <div className="overflow-y-auto pb-4 pt-12 h-full">
          {(recipeData || noRecipeFoundError) && (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Recipe
                data={recipeData}
                savedRecipes={savedRecipes}
                loading={loading}
                onSave={onSave}
                onRemove={onRemove}
                noRecipeFoundError={noRecipeFoundError}
              />
            </React.Suspense>
          )}
          {!recipeData && !noRecipeFoundError && <NoRecipe />}
        </div>
        <div className="flex items-end gap-x-2 lg:w-[40%] xl:w-[40%] relative py-4 px-2 md:px-12 md:mx-auto">
          <DropdownButton
            savedRecipes={savedRecipes}
            onSelect={onSelectRecipe}
          />
          <div className="w-full h-full relative">
            <div className="flex gap-y-1 flex-wrap-reverse gap-x-1 max-w-full absolute bottom-11 px-1">
              {listOfIngredients.map((ingredient) => (
                <BrandButton
                  key={ingredient}
                  label={ingredient}
                  onClick={() => {
                    setListOfIngredients(
                      listOfIngredients.filter((item) => item !== ingredient)
                    );
                  }}
                />
              ))}
            </div>
            <Search
              hasAdd
              placeholder="Type your ingredient/s here..."
              onSubmit={(ingredients) => {
                setListOfIngredients([...listOfIngredients, ...ingredients]);
              }}
            />
          </div>
          <Button onClick={handleRandomize}>
            {isMobile ? <PrintLogo /> : "Randomize"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
