// AcademicRanksComponent.tsx

import React, { useState } from "react";
import useAcademicRank from "../../../hooks/useAcademicRank";
import { RangoAcademico } from "../../../const";
import { capitalizeFirstLetterOfEachWord } from "../../../utils/others";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";

// Definición de los tipos para las props
interface ChildComponentProps {
  setactiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
  activecategory: string | null;
}

const AcademicRanksComponent: React.FC<ChildComponentProps> = ({
  setactiveCategory,
  activecategory,
}) => {
  const {
    academicRanks,
    error,
    createAcademicRank,
    deleteAcademicRank,
    // updateAcademicRank,
  } = useAcademicRank();

  const [newRank, setNewRank] = useState<string>("");

  const handleCreate = async () => {
    try {
      await createAcademicRank(newRank);
      setNewRank("");
    } catch (error) {
      console.error("Error creating academic rank");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAcademicRank(id);
    } catch (error) {
      console.error("Error deleting academic rank:", error);
    }
  };

  if (error) {
    return (
      <div className="text-red-600">
        Error loading academic ranks: {error.message}
      </div>
    );
  }

  if (!academicRanks) {
    return <div className="text-blue-500">Loding...</div>;
  }

  return (
    <div className="basis-4/12">
      <h2 className="text-lg font-medium mb-5">Categorias Docentes </h2>

      {/* Create Academic Rank */}
      <div className="mb-4 flex">
        <input
          type="text"
          className="p-2 border border-gray-300 w-full mr-3 input  input-md"
          placeholder="Escribe la nueva categoria docente"
          value={newRank}
          onChange={(e) => setNewRank(e.target.value)}
        />
        <button className="btn flex btn-primary" onClick={handleCreate}>
          <span>Guardar</span>
          <PlusIcon className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* List Academic Ranks */}
      <ul>
        {academicRanks.map(
          (rank: { rank: RangoAcademico } & { id: string }) => {
            const isActive = rank.id === activecategory;

            return (
              <li
                key={rank.id}
                className="flex items-center justify-between border-b py-2 "
              >
                <div
                  className={`cursor-pointer py-2 ${
                    isActive && "link text-gray-900 font-medium"
                  }`}
                  onClick={() => setactiveCategory(rank.id)}
                >
                  {capitalizeFirstLetterOfEachWord(rank.rank)}
                </div>
                <div>
                  <button
                    className=" btn btn-outline hover:border-red-600 hover:bg-transparent hover:text-red-600 flex items-center"
                    onClick={() => handleDelete(rank.id)}
                  >
                    <span className="hidden md:block">Eliminar</span>
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default AcademicRanksComponent;
