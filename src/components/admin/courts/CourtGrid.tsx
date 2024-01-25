import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"; // Import Heroicons icons
import { useCourts } from "../../../hooks/useCourts";
import { Court } from "../../../types";

import { NewCourtForm } from "./CreateCourt";
import { TrashIcon } from "@heroicons/react/24/solid";

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
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 ">
        <NewCourtForm onSubmit={() => {}} />
        <div className="block sm:hidden divider"></div>
        <div className="grid grid-cols-1  lg:grid-cols-2 2xl:grid-cols-3 grid-rows-2 gap-6  border rounded-md p-3">
          {courts.map((court, index) => (
            <CourtCard
              key={court.id}
              court={court}
              isLastItem={index === courts.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CourtCard = ({ court }: { court: Court; isLastItem: boolean }) => {
  const { deleteCourt } = useCourts();

  return (
    <div className="relative bg-white shadow-md p-3 pb-10 rounded-md transition-transform transform hover:scale-105">
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
        <div className="flex justify-end">
          <button
            onClick={() => deleteCourt(court.id)}
            className="btn flex items-center mt-5"
          >
            <span>Eliminar</span>
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </ul>
    </div>
  );
};

export default CourtsGrid;
