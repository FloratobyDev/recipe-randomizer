import React, { useEffect, useRef, useState } from "react";

type Props = {
  placeholder?: string;
  onSubmit?: (value: string[]) => void;
  hasAdd?: boolean;
};

function Search({ placeholder = "Search", onSubmit, hasAdd }: Props) {
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchValue]);

  function handleSearch() {
    if (searchValue === "") return;

    const splitByCommaAndTrimmed = searchValue
      .split(",")
      .map((item) => item.trim());
    onSubmit(splitByCommaAndTrimmed);
    setSearchValue("");
  }
  return (
    <div className="border-2 rounded-md border-background px-2 w-full h-full flex items-center">
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        type="text"
        className=" outline-none bg-transparent w-full h-full placeholder:text-background placeholder:text-sm md:placeholder:text-base placeholder:font-jost font-jost"
        autoFocus
        placeholder={placeholder}
      />
      {hasAdd && (
        <p
          onClick={handleSearch}
          className="px-1 rounded-md cursor-pointer hover:bg-background hover:text-primary font-jost select-none"
        >
          Add
        </p>
      )}
    </div>
  );
}

export default Search;
