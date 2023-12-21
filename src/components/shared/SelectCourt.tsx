import React from "react";
import { useCourts } from "../../hooks/useCourts";
import { Court } from "../../types";

const SelectCourt: React.FC = () => {
  const { courts, isLoading, isError } = useCourts();

  return (
    <div>
      {isLoading && <p>Loading courts...</p>}
      {isError && <p>Error loading courts</p>}
      {!isLoading && !isError && (
        <select name="court" required className="select">
          <option value="" disabled>
            Selecciona un tribunal
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
