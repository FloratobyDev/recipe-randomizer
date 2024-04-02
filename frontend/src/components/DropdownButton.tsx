import React, { useRef, useState } from "react";
import Button from "./Button";
import Search from "./Search";
import useOutsideClick from "src/hooks/useOutsideClick";
import { RecipeInformation } from "src/types";

type Props = {
  savedRecipes: RecipeInformation[];
  onSelect: (recipe: RecipeInformation) => void;
};

function DropdownButton({ savedRecipes, onSelect }: Props) {
  const [show, setShow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);


  useOutsideClick(divRef, show, handleShow);

  function handleShow() {
    setShow(!show);
  }
  return (
    <div ref={divRef} className="relative select-none z-10">
      {show && (
        <div className="absolute bottom-12 left-0 bg-primary border border-background rounded-md p-2 w-44">
          <Search placeholder="Search" />
          <div className="mt-1 text-xs flex flex-col gap-y-0.5">
            {savedRecipes.map((recipe) => (
              <Button
                key={recipe.recipeInformation.id}
                onClick={() => {
                  onSelect(recipe);
                  handleShow();
                }}
              >
                {recipe.recipeInformation.title}
              </Button>
            ))}
          </div>
        </div>
      )}
      <Button onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="24px"
          height="24px"
          fill="#FEFFED"
        >
          <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" />
        </svg>
      </Button>
    </div>
  );
}

export default DropdownButton;
