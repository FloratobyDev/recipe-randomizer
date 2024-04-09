import React from "react";
import image from "../asset/image.png";

function NoRecipeFoundError() {
  return (
    <div className="flex h-full justify-center items-center flex-col px-2 lg:w-[24%] md:w-[36%] xl:w[16%] mx-auto">
      <img className="w-64 h-64" src={image} alt="image" />
      <h4 className=" text-center font-jost py-2">
        No recipe found. Please try again.
      </h4>
    </div>
  );
}

export default NoRecipeFoundError;
