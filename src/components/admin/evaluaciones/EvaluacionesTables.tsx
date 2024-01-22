import { Link } from "react-router-dom";
import { Evaluation } from "../../../types";
import { EyeIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { EvalStatus } from "../../../const";
import { formatDate } from "../../../utils/others";

interface EvaluationListProps {
  evaluations: Evaluation[];
  handleSetEditMode: (id: string) => void;
  // TODO: hanlde create evaluation function
}

export const BtnWithTooltip = ({
  href,
  tooltip,
  icon: Icon,
  onClick = () => {},
}: {
  href: string;
  tooltip: string;
  icon: ReactElement;
  onClick?: () => void; // Optional onClick function
}) => {
  return (
    <Link to={href}>
      <button
        onClick={() => onClick()}
        className="tooltip btn btn-square bg-transparent border flex items-center justify-center shadow-none"
        data-tip={tooltip}
      >
        {Icon}
      </button>
    </Link>
  );
};

const StatusBadge = ({ status }: { status: EvalStatus }) => {
  const isOpen = status === EvalStatus.Open;
  const label = isOpen ? "Abierta" : "Cerrada";

  return (
    <div>
      Estado:{" "}
      <span className={isOpen ? "bg-yellow-200 px-3 px-1" : "bg-red-200"}>
        {label}
      </span>
    </div>
  );
};

const EvaluationListSmall: React.FC<EvaluationListProps> = ({
  evaluations,
}) => {
  return (
    <div className="block md:hidden container mx-auto mt-8">
      {evaluations && (
        <div className="flex flex-col gap-5">
          {evaluations.map((evaluation) => (
            <div
              key={evaluation.id}
              className="p-4  border border-gray-300 rounded-md card card-compact shadow-xl sm:w-full"
            >
              <p>Tipo de evaluacion: {evaluation.type}</p>
              <p>Description: {evaluation.description}</p>
              <StatusBadge status={evaluation.status} />
              <p>Cierra en : {evaluation.endDate.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EvaluationListLarge: React.FC<EvaluationListProps> = ({
  evaluations,
  handleSetEditMode,
}) => {
  return (
    <div className="hidden md:block container mx-auto mt-8">
      {evaluations && (
        <table className="min-w-full table">
          <thead className="">
            <tr>
              <th className="border p-2 text-gray-600">Tipo de evaluacion</th>
              <th className="border p-2 text-gray-600">Descripcion</th>
              <th className="border p-2 text-gray-600">
                Estado de la Evaluacion
              </th>
              <th className="border p-2 text-gray-600">Cierra en</th>
              <th className="border p-2 text-gray-600">Aciones</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((evaluation) => (
              <tr key={evaluation.id}>
                <td className="border">{evaluation.type}</td>
                <td className="border">{evaluation.description}</td>
                <td className="border">
                  <StatusBadge status={evaluation.status} />
                </td>
                <td className="border">
                  {formatDate(evaluation.endDate.toLocaleString())}
                </td>
                <td className="flex gap-1">
                  <BtnWithTooltip
                    href={`/admin/evaluaciones/${evaluation.id}/submissions`}
                    icon={<EyeIcon className="w-4 h-4" />}
                    tooltip="Ver envios"
                  />
                  <BtnWithTooltip
                    href=""
                    icon={<PencilSquareIcon className="w-4 h-4" />}
                    tooltip="Editar"
                    onClick={() => {
                      handleSetEditMode(evaluation.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const EvaluacionesTables: React.FC<EvaluationListProps> = ({
  evaluations,
  handleSetEditMode,
}) => {
  return (
    <>
      <EvaluationListSmall
        evaluations={evaluations}
        handleSetEditMode={handleSetEditMode}
      />
      <EvaluationListLarge
        evaluations={evaluations}
        handleSetEditMode={handleSetEditMode}
      />
    </>
  );
};

export default EvaluacionesTables;
