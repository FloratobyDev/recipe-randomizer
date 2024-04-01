import React from "react";

type StepType = {
  step: string;
  number: number;
  equipment: any[];
  ingredients: any[];
};

type Props = {
  instructions: StepType[];
};

function InstructionStep({ instructions }: Props) {
  return (
    <ol className="list-decimal ml-6">
      {instructions.map((instruction) => (
        <li className="font-jost" key={instruction.step}>{instruction.step}</li>
      ))}
    </ol>
  );
}

export default InstructionStep;
