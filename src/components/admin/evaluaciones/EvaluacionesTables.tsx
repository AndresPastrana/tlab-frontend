import { Evaluation } from "../../../types";

interface EvaluationListProps {
  evaluations: Evaluation[];
  // TODO: hanlde create evaluation function
}

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
              <p>Status: {evaluation.status}</p>
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
}) => {
  return (
    <div className="hidden md:block container mx-auto mt-8">
      {evaluations && (
        <table className="min-w-full table">
          <thead>
            <tr>
              <th className="border p-2">Tipo de evaluacion</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Cierra en</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((evaluation) => (
              <tr key={evaluation.id}>
                <td className="border">{evaluation.type}</td>
                <td className="border">{evaluation.description}</td>
                <td className="border">{evaluation.status}</td>
                <td className="border">
                  {evaluation.endDate.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const EvaluacionesTables: React.FC<EvaluationListProps> = ({ evaluations }) => {
  return (
    <>
      <EvaluationListSmall evaluations={evaluations} />
      <EvaluationListLarge evaluations={evaluations} />
    </>
  );
};

export default EvaluacionesTables;
