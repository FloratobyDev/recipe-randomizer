import React, { useEffect, useRef, useState } from "react";

import Search from "./components/Search";
import Button from "./components/Button";
import axios from "axios";
import BrandButton from "./components/BrandButton";
import DropdownButton from "./components/DropdownButton";
import Recipe from "./Recipe";
import { RecipeInformation } from "./types";

function App() {
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const [recipeData, setRecipeData] = useState<RecipeInformation>(null);
  const [loading, setLoading] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [noRecipeFoundError, setNoRecipeFoundError] = useState(false);

  useEffect(() => {
    const indexedDB = window.indexedDB;
    const request = indexedDB.open("recipe", 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore("recipe", { keyPath: "id" });
    };

    request.onsuccess = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("recipe", "readwrite");
      const recipeStore = transaction.objectStore("recipe");
      const request = recipeStore.getAll();

      request.onsuccess = (event) => {
        const results = (event.target as IDBRequest).result;
        const recipes = results.map((result) => result.recipe);
        setSavedRecipes(recipes);
      };
    };
  }, []);

  function handleRandomize() {
    setLoading(true);
    setNoRecipeFoundError(false);
    axios
      .get("/api/randomize", {
        params: {
          ingredients: listOfIngredients,
        },
      })
      .then((res) => {
        setRecipeData(res.data);
      })
      .catch((err) => {
        setNoRecipeFoundError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
          <Recipe
            data={recipeData}
            savedRecipes={savedRecipes}
            loading={loading}
            onSave={onSave}
            onRemove={onRemove}
            noRecipeFoundError={noRecipeFoundError}
          />
        </div>
        <div className="flex items-end gap-x-2 lg:w-[40%] xl:w-[30%] relative py-4 px-2 md:px-12 md:mx-auto">
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
            {isMobile ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="white"
              >
                <path d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z" />
              </svg>
            ) : (
              "Randomize"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
