import React from "react";
import { PopulatedTesisResponse } from "../../types";
import { FunctionalRequirements } from "./FunctionalRequirements";
import { ApprovalInfo } from "./ApprovalInfo";
import { capitalizeFirstLetterOfEachWord } from "../../utils/others";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../const";

export interface ProyectInfoProps {
  proyect: PopulatedTesisResponse;
  aproveProject: (id: string, recoms: string) => Promise<void>;
}

const ProyectInfo: React.FC<ProyectInfoProps> = ({
  proyect,
  aproveProject,
}) => {
  const { user } = useAuth();
  const handleAproveProyect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const recoms = formData.get("tutor_recoms") as string;

      if (recoms) {
        await aproveProject(proyect.id, recoms);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isStudent = user?.role === UserRole.Student;

  const isProfessor = user?.role === UserRole.Profesor;

  return (
    <div className="p-5 card shadow-lg mt-3">
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Titulo del Proyecto:{" "}
          <span className="font-medium ml-3 text-lg">{proyect.topic}</span>
        </h2>
      </div>
      <div>
        {isProfessor && (
          <p className="text-gray-500">
            Asignado al estudiante{": "}
            <span className="ml-3 text-gray-800">
              {capitalizeFirstLetterOfEachWord(proyect.student.name)}{" "}
              {capitalizeFirstLetterOfEachWord(proyect.student.lastname)}
            </span>
          </p>
        )}
      </div>
      <div className="divider"></div>
      <div className="mb-4">
        <p className="text-gray-700">
          <span className="font-semibold">Objetivo General:</span>{" "}
          {proyect.general_target}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Problema Cientifico:</span>{" "}
          {proyect.scientific_problem}
        </p>
      </div>
      <div className="divider"></div>
      {/* Display Functional Requirements if are defined */}

      <FunctionalRequirements
        onUpdateRequirements={(req) => {
          console.log(req);
        }}
        status={proyect.status}
        functionalRequirements={proyect.functional_requirements}
      />

      <div className="divider"></div>
      {/* Display Approval Info if the orject is aproved*/}
      {proyect.approval && (
        <ApprovalInfo status={proyect.status} approvalInfo={proyect.approval} />
      )}

      {/* Aprovar proyecto btn */}

      <form onSubmit={handleAproveProyect}>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold" htmlFor="tutor_recoms">
            {isStudent ? "Recomendaciones del tutor" : "Recomendaciones"}
          </label>
          <textarea
            required
            defaultValue={proyect.approval?.recommendations}
            disabled={!!proyect.approval || user?.role !== UserRole.Profesor}
            minLength={10}
            maxLength={50}
            className="text-sm textarea textarea-bordered textarea-lg w-full max-w-md"
            name="tutor_recoms"
            id="tutor_recoms"
          />
        </div>
        {!proyect.approval && isProfessor && (
          <button
            type="submit"
            disabled={!!proyect.approval}
            className="btn mt-5 bg-green-700 text-gray-50 hover:bg-green-800 px-6"
          >
            Approved: {`${proyect.approval ? "Is aproved " : "Not Aproved"}`}
          </button>
        )}
      </form>
    </div>
  );
};

export default ProyectInfo;
