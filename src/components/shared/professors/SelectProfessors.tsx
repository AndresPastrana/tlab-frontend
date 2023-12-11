import { useProfessors } from "../../../hooks/useProfessors";
import React from "react";

interface Professor {
  id: string;
  name: string;
  lastname: string;
}

const SelectProfessors: React.FC = () => {
  const { professors, isLoading, error } = useProfessors();

  return (
    <>
      <div className="flex flex-col gap-1 max-w-2xl">
        <label htmlFor="professors" className="text-sm">
          Tutores asignados al proyecto:{" "}
          <span className="font-medium" id="selectedProfessorsLabel">
            {/* Access the selected options directly from the DOM */}
          </span>
        </label>
        <select
          name="selectedProfessors"
          id="professors"
          className="select select-multiple select-bordered w-full"
          multiple // Enable multiple selection
          defaultValue={[]}
        >
          {/* Default Option */}
          <option value="" disabled>
            Selecciona profesores
          </option>

          {/* Loading */}
          {isLoading && !error && professors.length === 0 && (
            <p>Loading professors</p>
          )}

          {/* Error */}
          {!isLoading && error && <p>Error cargando los profesores</p>}

          {/* Professors list */}
          {!isLoading &&
            !error &&
            professors.length > 0 &&
            professors.map((professor: Professor) => (
              <option className="py-1" key={professor.id} value={professor.id}>
                {professor.name} {professor.lastname}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default SelectProfessors;
