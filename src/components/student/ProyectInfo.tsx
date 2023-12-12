import React from "react";
import { PopulatedTesisResponse } from "../../types";
import { FunctionalRequirements } from "./FunctionalRequirements";
import { ApprovalInfo } from "./ApprovalInfo";

interface ProyectInfoProps {
  proyect: PopulatedTesisResponse;
}

const ProyectInfo: React.FC<ProyectInfoProps> = ({ proyect }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{proyect.topic}</h1>

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

      {/* Display Approval Info */}
      <ApprovalInfo approvalInfo={proyect.approval} />

      {/* Display Functional Requirements */}
      <FunctionalRequirements
        onUpdateRequirements={(req) => {
          console.log(req);
        }}
        status={proyect.status}
        functionalRequirements={proyect.functional_requirements}
      />
    </div>
  );
};

export default ProyectInfo;
