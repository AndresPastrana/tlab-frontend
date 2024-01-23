// AcademicRanksComponent.tsx

import React, { useState } from "react";
import useAcademicRank from "../hooks/useAcademicRank";
import { RangoAcademico } from "../const";

const AcademicRanksComponent: React.FC = () => {
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
      console.error("Error creating academic rank:", error.message);
    }
  };

  const handleUpdate = async (id: string, updatedRank: string) => {
    try {
      //   await updateAcademicRank(id, updatedRank);
    } catch (error) {
      console.error("Error updating academic rank:", error.message);
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
    return <div className="text-blue-500">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Academic Ranks</h1>

      {/* Create Academic Rank */}
      <div className="mb-4 flex">
        <input
          type="text"
          className="p-2 border border-gray-300 w-full"
          placeholder="Enter new academic rank"
          value={newRank}
          onChange={(e) => setNewRank(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreate}>
          Create
        </button>
      </div>

      {/* List Academic Ranks */}
      <ul>
        {academicRanks.map(
          (rank: { rank: RangoAcademico } & { id: string }) => (
            <li
              key={rank.id}
              className="flex items-center justify-between border-b py-2"
            >
              <span>{rank.rank}</span>
              <div>
                {/* TODO: Editar */}
                {/* <button
                  className="bg-green-500 text-white px-2 py-1 mr-2"
                  onClick={() => handleUpdate(rank.id, `${rank.rank} Updated`)}
                >
                  Update
                </button> */}
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(rank.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default AcademicRanksComponent;
