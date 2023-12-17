import { ExclamationTriangleIcon, PlusIcon } from "@heroicons/react/24/outline"; // Import Heroicons icons
import { useCourts } from "../../../hooks/useCourts";
import { Court } from "../../../types";
import { useState } from "react";
import { DaisyUIMenu } from "./DaisyUiMenu";

import { NewCourtForm } from "./CreateCourt";

const CourtsGrid = () => {
  const { courts, isLoading, isError, mutate } = useCourts();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className=" flex flex-col items-center gap-3">
        <div className="flex mx-auto bg-red-100 w-fit px-10 text-center  text-sm py-3 rounded-lg text-red-700 font-medium items-center gap-3">
          <ExclamationTriangleIcon className="w-5 h-5" />
          <span>Error loading courts</span>
        </div>
        <span>
          <button className="btn " onClick={() => mutate()}>
            Intentar de nuevo
          </button>
        </span>
      </div>
    );
  }

  return (
    <div className="text-gray-700">
      {/* <h1 className="text-xl font-semibold mb-6">Courts Information</h1> */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-10 ">
        {courts.map((court, index) => (
          <CourtCard
            key={court.id}
            court={court}
            isLastItem={index === courts.length - 1}
          />
        ))}

        <div className="block sm:hidden divider"></div>

        <NewCourtForm onSubmit={() => {}} />
      </div>
    </div>
  );
};

const CourtCard = ({
  court,
  isLastItem,
}: {
  court: Court;
  isLastItem: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative bg-white shadow-md p-6 pb-10 rounded-md transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-4">{court.name}</h2>
      <ul className="space-y-2">
        {court.members.map((member) => (
          <li key={member._id} className="flex items-center">
            <strong className="text-gray-600 mr-2">{member.role}:</strong>
            <span className="text-gray-600">
              {member.profesor.name} {member.profesor.lastname}
            </span>
          </li>
        ))}
      </ul>

      <div className="absolute top-0 right-0 mt-2 mr-2">
        <button
          type="button"
          className="text-gray-600 focus:outline-none"
          onClick={handleToggleMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
        <DaisyUIMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>

      {/* Plus button in the card */}
      {/* {isLastItem && (
        <button className="absolute bottom-0 right-0  mb-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex flex-col items-center justify-center rounded-full focus:outline-none">
          <PlusIcon className="h-5 w-5 inline-block -ml-1" />
        </button>
      )} */}
    </div>
  );
};

export default CourtsGrid;
