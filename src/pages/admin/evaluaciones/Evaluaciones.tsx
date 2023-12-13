import { useEvaluations } from "../../../hooks/useEvaluaciones";
import { Evaluation } from "../../../types";
import { useEvaluationsFilters } from "../../../context/EvaluationFilterContext";
import { EvalFilters } from "../../../components/admin/evaluaciones/EvalFilters";

interface EvaluationListSmallProps {
  evaluations: Evaluation[];
  // TODO: hanlde create evaluation function
}

const Header = () => {
  return (
    <div className=" flex items-center justify-between mt-12">
      <h1 className="text-xl font-bold">Evalucaiones </h1>
      <EvalFilters />
    </div>
  );
};

const EvaluationListSmall: React.FC<EvaluationListSmallProps> = ({
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

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Create Evaluation
      </button>
    </div>
  );
};

const EvaluationListLarge: React.FC<EvaluationListSmallProps> = ({
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

      <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4">
        Create Evaluation
      </button>
    </div>
  );
};

const Evaluaciones = () => {
  const {
    evaluations: allEvaluations,
    isLoading,
    isError,
    error,
  } = useEvaluations();

  // Rendered evaluations will be filtered based on the filter values
  const { filters } = useEvaluationsFilters();

  const evaluations = allEvaluations.filter(
    (evaluation) =>
      (!filters.status || evaluation.status === filters.status) &&
      (!filters.type || evaluation.type === filters.type)
  );

  const noSerachResult = evaluations.length >= 1;

  const results = noSerachResult ? evaluations : allEvaluations;

  return (
    <>
      {isLoading && <p>Loading evaluations...</p>}
      {isError && <p>Error loading evaluations: {error.message}</p>}
      <Header />
      {!noSerachResult ? (
        <p className="flex justify-between w-[300px] py-1 px-4  bg-gray-100 text-gray-500  rounded-2xl items-center">
          <p>Mostrando todos los resultados:</p>
          <span className="text-gray-700 font-medium badge">
            {allEvaluations.length}
          </span>
        </p>
      ) : (
        <p className=" flex justify-between w-[300px] py-1 px-4  bg-gray-100 text-gray-500  rounded-2xl items-center">
          Resultados filtrados:{" "}
          <span className="text-gray-700 font-medium badge">
            {results.length}
          </span>
        </p>
      )}
      <EvaluationListSmall evaluations={results} />
      <EvaluationListLarge evaluations={results} />
    </>
  );
};

export default Evaluaciones;
