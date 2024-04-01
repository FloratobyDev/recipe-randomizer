import React, { useRef, useState } from "react";
import Button from "./Button";
import Search from "./Search";
import useOutsideClick from "src/hooks/useOutsideClick";

function DropdownButton() {
  const [show, setShow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useOutsideClick(divRef, show, handleShow);

  function handleShow() {
    setShow(!show);
  }
  return (
    <div ref={divRef} className="relative select-none">
      {show && (
        <div className="absolute bottom-12 left-0 bg-blue-200 p-2 w-44">
          <Search placeholder="Search" />
          <p>Lime Chicken</p>
          <p>Fried Chicken</p>
          <p>Fried Chicken</p>
          <p>Fried Chicken</p>
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