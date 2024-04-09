import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  [key: string]: any;
};

function Button({ children, onClick, ...rest }: Props) {
  return (
    <div
      {...rest}
      onClick={onClick}
      className="bg-background rounded-md py-2 px-3 hover:opacity-85 cursor-pointer flex items-center justify-center text-primary select-none font-jost"
    >
      {children}
    </div>
  );
}

export default Button;
