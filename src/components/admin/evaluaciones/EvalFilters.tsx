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
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium mr-2">Filtrar por Estado</label>
        <select
          className="select select-bordered"
          onChange={handleStatusChange}
          value={filters.status}
        >
          <option value={EvalStatus.Open}>Abiertas</option>
          <option value={EvalStatus.Close}>Cerradas</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Filtrar por Tipo de Evaluacion
        </label>
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
