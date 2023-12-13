// EvalFilters.tsx
import React from "react";

import { useEvaluationsFilters } from "../../../context/EvaluationFilterContext";
import { EvalStatus, EvalType } from "../../../const";

export const EvalFilters: React.FC = () => {
  const { filters, setFilters } = useEvaluationsFilters();

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: event.target.value as EvalStatus,
    }));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: event.target.value as EvalType,
    }));
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <div>
        <label className="text-sm font-medium">Status:</label>
        <select
          className="select select-bordered"
          onChange={handleStatusChange}
          value={filters.status}
        >
          <option value={EvalStatus.Open}>Open</option>
          <option value={EvalStatus.Close}>Closed</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Type:</label>
        <select
          className="select select-bordered"
          onChange={handleTypeChange}
          value={filters.type}
        >
          <option value={EvalType.CorteEvaluativo}>Corte Evaluativo</option>
          <option value={EvalType.Predefensa}>Predefensa</option>
        </select>
      </div>
    </div>
  );
};
