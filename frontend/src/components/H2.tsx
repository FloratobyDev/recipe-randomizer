import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  bold?: boolean;
};

function H2({ children, bold }: Props) {
  const h2Classes = classNames("text-3xl font-courgette capitalize", {
    "font-bold": bold,
  });
  return <h2 className={h2Classes}>{children}</h2>;
}

export default H2;
