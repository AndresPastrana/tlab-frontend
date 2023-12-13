// import { UserRole } from "../../const";
// import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../const";
import { useAuth } from "../../hooks/useAuth";
import { Approval } from "../../types";

interface ApprovalInfoProps {
  approvalInfo: Approval | null;
}

const ApproveBtn = () => {
  return (
    <button className="btn mt-5 bg-green-700 text-gray-50 hover:bg-green-800 px-6">
      Approved
    </button>
  );
};

export const ApprovalInfo: React.FC<ApprovalInfoProps> = ({ approvalInfo }) => {
  const { user } = useAuth();
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
      {/* {user?.role === UserRole.Student && true && <ApproveBtn />} */}

      {user?.role === UserRole.Profesor && <ApproveBtn />}
    </div>
  );
};
