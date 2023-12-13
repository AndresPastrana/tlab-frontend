import React from "react";
import { PopulatedTesisResponse } from "../../types";
import { FunctionalRequirements } from "./FunctionalRequirements";
import { ApprovalInfo } from "./ApprovalInfo";

interface ProyectInfoProps {
  proyect: PopulatedTesisResponse;
}

const ProyectInfo: React.FC<ProyectInfoProps> = ({ proyect }) => {
  return (
    <div className="p-5 card shadow-lg mt-3">
      <h2 className="text-lg font-semibold mb-4">
        Titulo del Proyecto:{" "}
        <span className="font-medium ml-3 text-lg">{proyect.topic}</span>
      </h2>

      <div className="divider"></div>
      <div className="mb-4">
        <p className="text-gray-700">
          <span className="font-bold">General Target:</span>{" "}
          {proyect.general_target}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Scientific Problem:</span>{" "}
          {proyect.scientific_problem}
        </p>
      </div>
      <div className="divider"></div>
      {/* Display Functional Requirements */}
      <FunctionalRequirements
        onUpdateRequirements={(req) => {
          console.log(req);
        }}
        status={proyect.status}
        functionalRequirements={proyect.functional_requirements}
      />
      <div className="divider"></div>
      {/* Display Approval Info */}
      <ApprovalInfo approvalInfo={proyect.approval} />
    </div>
  );
};

export default ProyectInfo;
