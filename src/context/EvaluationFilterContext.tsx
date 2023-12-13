// EvaluationsFilterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { EvalStatus, EvalType } from "../const";

interface EvaluationsFilterContextProps {
  filters: {
    status: EvalStatus;
    type: EvalType;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      status: EvalStatus;
      type: EvalType;
    }>
  >;
}

interface EvaluationsFilterProviderProps {
  children: ReactNode;
}

const defaultFilters = {
  status: EvalStatus.Open,
  type: EvalType.CorteEvaluativo,
};

const EvaluationsFilterContext = createContext<
  EvaluationsFilterContextProps | undefined
>(undefined);

export const EvaluationsFilterProvider: React.FC<
  EvaluationsFilterProviderProps
> = ({ children }) => {
  const [filters, setFilters] = useState<{
    status: EvalStatus;
    type: EvalType;
  }>(defaultFilters);

  const contextValue: EvaluationsFilterContextProps = {
    filters,
    setFilters,
  };

  return (
    <EvaluationsFilterContext.Provider value={contextValue}>
      {children}
    </EvaluationsFilterContext.Provider>
  );
};

export const useEvaluationsFilters = () => {
  const context = useContext(EvaluationsFilterContext);

  if (!context) {
    throw new Error(
      "useEvaluationsFilters must be used within an EvaluationsFilterProvider"
    );
  }

  return context;
};
