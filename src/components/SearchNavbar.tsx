import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface Option {
  href: string;
  label: string;
}

interface FilteredListProps {
  options: Option[];
  ref?: React.RefObject<HTMLUListElement>;
}
const LinkGroup: React.FC<FilteredListProps> = ({ options, ref }) => {
  return (
    <ul
      ref={ref}
      className="absolute top-full left-0 w-full bg-white border rounded-3xl border-gray-300 shadow-md z-10 flex flex-col"
    >
      {options.map((option) => (
        <Link
          key={option.href}
          target="_self"
          to={option.href}
          className="p-2 hover:bg-gray-100 hover:text-gray-700 rounded-3xl block w-full"
        >
          {option.label}
        </Link>
      ))}
    </ul>
  );
};

const SearchNavbar: React.FC<FilteredListProps> = ({ options }) => {
  const [filterText, setFilterText] = useState<string>("");
  const filteredOptions = options.filter((option) => {
    console.log(filterText);
    console.log(option);

    return option.label.toLowerCase().includes(filterText.toLowerCase());
  });

  console.log(filteredOptions);

  const [showLinkGroup, setShowLinkGroup] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    // Hide LinkGroup on navigation
    setShowLinkGroup(false);
    setFilterText("");
  }, [location.pathname]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Check if the element gaining focus is not the input or LinkGroup
    const focusedElement = event.relatedTarget;

    if (!focusedElement) {
      console.log(focusedElement);

      setShowLinkGroup(false);
    }
  };

  return (
    <div className="relative" onBlur={handleBlur}>
      <input
        defaultValue={""}
        type="text"
        placeholder="Que desea buscar ....?"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        onBlur={handleBlur}
        onFocus={() => setShowLinkGroup(true)}
        className="w-80  md:w-96 p-2 border  input input-ghost bg-gray-50 rounded-3xl focus:bg-white focus:outline-none focus:border focus:border-gray-100 focus:shadow-md"
      />

      <MagnifyingGlassIcon className="pointer-events-none w-7 h-7 absolute top-1/2 transform -translate-y-1/2 left-[85%] text-gray-400" />

      {showLinkGroup && filterText !== "" && filterText.length > 0 && (
        <LinkGroup options={filteredOptions} />
      )}

      {showLinkGroup && filterText !== "" && filterText.length === 0 && (
        <LinkGroup options={options} />
      )}
    </div>
  );
};

export default SearchNavbar;
