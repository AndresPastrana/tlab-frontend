// import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";

interface DaisyUIMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DaisyUIMenu: React.FC<DaisyUIMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <ul
      ref={menuRef}
      className={`${
        isOpen ? "block" : "hidden"
      } origin-top-right absolute right-0 mt-2  shadow-lg ring-1 ring-black ring-opacity-5  menu bg-base-200 rounded-box p-0 py-2`}
    >
      {/* <li>
        <a className="tooltip tooltip-left" data-tip="Eliminar Tribunal">
          <TrashIcon className="w-5 h-5 m-0 p-0" />
        </a>
      </li> */}
    </ul>
  );
};
