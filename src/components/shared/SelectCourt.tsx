import React from "react";
import { useCourts } from "../../hooks/useCourts";
import { Court } from "../../types";

const SelectCourt: React.FC = () => {
  const { courts, isLoading, isError } = useCourts();
  // Placeholder text for the Select component
  const placeholder = "Selecciona el tribunal ";
  return (
    <div>
      {isLoading && <p>Loading courts...</p>}
      {isError && <p>Error loading courts</p>}
      {!isLoading && !isError && (
        <select
          placeholder="Selecciona el tribunal"
          name="court"
          required
          className="select w-full"
        >
          <option value="" disabled={true} selected>
            {placeholder}
          </option>
          {courts.map((court: Court) => (
            <option key={court.id} value={court.id}>
              {court.name} -{" "}
              {court.members.map((member) => member.profesor.name).join(", ")}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectCourt;
