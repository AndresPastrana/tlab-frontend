// import { UserRole } from "../../const";
// import { useAuth } from "../../hooks/useAuth";

import { TesisProjectStatus } from "../../const";
import { Approval } from "../../types";
import { BadgeProjectStatus } from "../shared/projects/ProyectsTables";

interface ApprovalInfoProps {
  approvalInfo: Approval | null;
  status: TesisProjectStatus;
}

export const ApprovalInfo: React.FC<ApprovalInfoProps> = ({
  approvalInfo,
  status,
}) => {
  const formatDate = (date: Date | null) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  return (
    <div className="mb-4">
      <p className="text-gray-700">
        <span className="font-bold mr-2">Estado del proyecto:</span>{" "}
        <BadgeProjectStatus projectStatus={status} />
      </p>
      <p className="text-gray-700">
        <span className="font-bold mr-2">Aprobado por el tutor:</span>{" "}
        {approvalInfo?.approvedBy ? approvalInfo.approvedBy : "N/A"}
      </p>
      <p className="text-gray-700">
        <span className="font-bold mr-2">Fecha de Aprobacion </span>{" "}
        {approvalInfo?.date && formatDate(approvalInfo?.date)}
      </p>
    </div>
  );
};
