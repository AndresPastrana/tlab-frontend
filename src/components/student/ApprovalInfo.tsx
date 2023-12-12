import { Approval } from "../../types";

interface ApprovalInfoProps {
  approvalInfo: Approval | null;
}

export const ApprovalInfo: React.FC<ApprovalInfoProps> = ({ approvalInfo }) => {
  const formatDate = (date: Date | null) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  return (
    <div className="mb-4">
      <p className="text-gray-700">
        <span className="font-bold">Approval:</span>{" "}
        {approvalInfo?.isApprove ? "Approved" : "Not Approved"}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Approved By:</span>{" "}
        {approvalInfo?.approvedBy ? approvalInfo.approvedBy.name : "N/A"}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Approval Date:</span>{" "}
        {approvalInfo?.date && formatDate(approvalInfo?.date)}
      </p>
    </div>
  );
};
