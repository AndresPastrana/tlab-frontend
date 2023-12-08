import React, { FormEvent, useState } from "react";
import { useProfessors } from "../../../hooks/useProfessors";
import { CourtRole } from "../../../types.d.js";
import { useCourts } from "../../../hooks/useCourts.js";

import ErrorMessage from "../../shared/ErrorMessage.js";

interface NewCourtFormProps {
  onSubmit: (courtData: {
    name: string;
    members: { role: CourtRole; profesorId: string }[];
  }) => void;
}
interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormFieldSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

export const NewCourtForm: React.FC<NewCourtFormProps> = () => {
  const { professors } = useProfessors();
  const [reqState, setRequesState] = useState<{
    loading: boolean;
    error: string | null;
  }>({ error: null, loading: false });

  const [courtName, setCourtName] = useState<string>("");
  const { createCourt } = useCourts();
  const [selectedProfessors, setSelectedProfessors] = useState<{
    [key in CourtRole]: string;
  }>({
    [CourtRole.Presidente]: "",
    [CourtRole.Secretario]: "",
    [CourtRole.Vocal]: "",
    [CourtRole.Oponente]: "",
  });

  const handleRoleSelect = (role: CourtRole, professorId: string) => {
    setSelectedProfessors((prev) => ({ ...prev, [role]: professorId }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Loading state
    setRequesState({ error: null, loading: true });
    const courtData = {
      name: courtName,
      members: Object.keys(selectedProfessors).map((role) => ({
        role: role as CourtRole,
        profesor: selectedProfessors[role as CourtRole],
      })),
    };

    try {
      await createCourt(courtData);
      setRequesState({ ...reqState, loading: false });
      return;
    } catch (error) {
      console.log("cathc");

      console.log(error);

      setRequesState({
        loading: false,
        error: "Error al crear un nuevo tribunal",
      });
      return;
    } finally {
      e.currentTarget.reset();
    }
  };

  return (
    <div className="">
      <h2 className="text-xl text font-semibold mb-4">Crear Nueva Corte</h2>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Nombre de la Corte"
          type="text"
          id="courtName"
          value={courtName}
          onChange={(e) => setCourtName(e.target.value)}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Seleccionar Profesores por Rol
          </label>
          {Object.keys(selectedProfessors).map((role) => (
            <FormFieldSelect
              key={role}
              label={role}
              value={selectedProfessors[role as CourtRole]}
              onChange={(e) =>
                handleRoleSelect(role as CourtRole, e.target.value)
              }
              options={[
                { value: "", label: "Seleccionar Profesor" },
                ...professors.map((professor) => ({
                  value: professor.id,
                  label: `${professor.name} ${professor.lastname}`,
                })),
              ]}
            />
          ))}
        </div>

        <div className="flex justify-center font-medium my-2 py-3">
          <ErrorMessage errors={reqState.error || ""} />
        </div>
        <button
          type="submit"
          aria-disabled={reqState.loading}
          disabled={reqState.loading}
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-full focus:outline-none w-full"
        >
          {reqState.loading ? "Loading..." : "Crear corte"}
        </button>
      </form>
    </div>
  );
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full"
    />
  </div>
);

const FormFieldSelect: React.FC<FormFieldSelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <div className="mt-2">
    <label
      htmlFor={`role-${label}`}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={`role-${label}`}
      name={`role-${label}`}
      value={value}
      onChange={onChange}
      className="select mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-500"
    >
      {options.map((option, i) => (
        <option
          disabled={i === 0}
          selected={i === 0}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
