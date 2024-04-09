import React from "react";
import image from "../asset/image.png";

function NoRecipe() {
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

export default NoRecipe;
