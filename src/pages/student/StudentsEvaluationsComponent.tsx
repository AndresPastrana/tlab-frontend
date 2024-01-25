import { useStudentsEvaluations } from "../../hooks/useStudentEvaluations";
import { ClockIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Submission } from "../../types";
import { EvalStatus } from "../../const";
import { Link } from "react-router-dom";

interface SubmissionDateProps {
  date: Date;
}

interface EvaluationDescriptionProps {
  description: string;
}

interface SubmissionInfo {
  submission: Submission | null;
  status: EvalStatus;
  eval_id: string;
}

const SubmissionDate: React.FC<SubmissionDateProps> = ({ date }) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const currentDate = new Date();
  const submissionDate = new Date(date);

  let label = "";
  let icon = null;

  // Show different labels based on whether the current date is before or after the submission date
  if (currentDate > submissionDate) {
    const daysLate = Math.ceil(
      (currentDate.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    label = `Submission Date has passed by ${daysLate} day${
      daysLate !== 1 ? "s" : ""
    }`;
    icon = <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
  } else {
    const daysRemaining = Math.floor(
      (submissionDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    label = `Days remaining for submission: ${daysRemaining}`;
    icon = <ClockIcon className="h-5 w-5 text-yellow-500" />;
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="text-gray-600">{icon}</div>
      <div>
        <p className="text-sm">Submission Date: {formattedDate}</p>
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
};

const EvaluationDescription: React.FC<EvaluationDescriptionProps> = ({
  description,
}) => {
  return (
    <div className="mb-4 mt-5">
      <h2 className="font-medium mb-2">Descripcion de la evaluacion: </h2>
      <p>{description}</p>
    </div>
  );
};
const SubmissionForm: React.FC<
  Pick<SubmissionInfo, "submission" | "eval_id">
> = ({ submission, eval_id }) => {
  const { addSubmission } = useStudentsEvaluations();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Eval id");
    console.log(eval_id);

    const formData = new FormData(e.currentTarget);

    formData.append("evaluation_id", eval_id);
    console.log(Object.fromEntries(formData));

    await addSubmission(formData);
    // Implement your form submission logic here
    console.log("All ok from the submit");
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="mt-4 p-4 bg-gray-200 rounded-md">
        <h1>Formulario de envío</h1>

        <div className="mt-4 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">
            {submission ? "Editar envío" : "Agregar envío"}
          </h2>
          <label htmlFor="submissionFile" className="block">
            {submission
              ? "Selecciona un nuevo archivo para editar tu envío:"
              : "Agregar un archivo a tu envío"}
          </label>
          <input
            type="file"
            id="submissionFile"
            name="submissionFile"
            className="mt-2 file-input"
            required
          />
          {submission && (
            <div>
              <p>Archivo</p>
              <Link
                className="text-blue-600 hover:text-blue-800"
                to={submission.file}
              >
                {submission.file}
              </Link>
            </div>
          )}
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {submission ? "Editar archivo" : "Agregar envío"}
          </button>
        </div>
      </div>
    </form>
  );
};

const SubmissionInfo: React.FC<SubmissionInfo> = ({
  submission,
  status,
  eval_id,
}) => {
  {
    /* Evaluation is closed and has a submittion*/
  }
  if (status === EvalStatus.Close && submission) {
    return (
      <div>
        <p>
          Puntucaion {submission.score || "Su envio no ha sido calificado aun"}
        </p>
        <p className="text-sm font-semibold text-gray-500">
          La evalucion ha sido cerrada. Su envio no puede ser modificado
        </p>
      </div>
    );
  }

  if (status === EvalStatus.Close && !submission) {
    return (
      <div>
        <p>Ningun envio ha sido realizado para esta evaluacion</p>
        <p>Score: 2/5</p>
        <p className="text-sm font-semibold text-gray-500">
          La evalucion ha sido cerrada. Su envio no puede ser modificado
        </p>
      </div>
    );
  }

  // Eval is stil open . It might or migth not have submittion file
  if (status === EvalStatus.Open) {
    return (
      <div>
        <SubmissionForm submission={submission} eval_id={eval_id} />
      </div>
    );
  }
  return <p>Hola 2</p>;
};

const StudentsEvaluationsComponent = () => {
  const { evaluationsWithSubmissions, isLoading, isError, error } =
    useStudentsEvaluations();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Students Evaluations</h1>
      {evaluationsWithSubmissions.map(({ evaluation, submission }) => (
        <div key={evaluation.id} className="mb-8 p-4 bg-gray-100 rounded-md">
          <p>{evaluation.id}</p>

          <div className=" flex  items-center justify-between mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Detalles de la evaluacion
            </h2>
            <SubmissionDate date={evaluation.endDate} />
          </div>
          <div className="divider"></div>

          <p>
            <span className="font-medium">Tipo de evaluacion:</span>{" "}
            {evaluation.type.toLocaleUpperCase()}
          </p>
          <EvaluationDescription description={evaluation.description} />

          <div className="flex items-center justify-between">
            {evaluation.resourcesFile && (
              <div className="flex items-center justify-between gap-3">
                <p>Recursos:</p>
                <Link
                  to={evaluation?.resourcesFile}
                  className="link link-secondary"
                >
                  Descargar Recursos
                </Link>
              </div>
            )}
            {/* <p>Status: {evaluation.status}</p> */}
          </div>
          <div className="divider"></div>
          <SubmissionInfo
            eval_id={evaluation.id}
            status={evaluation.status}
            submission={submission}
          />
          {/* Add other evaluation details as needed */}
        </div>
      ))}
    </div>
  );
};

export default StudentsEvaluationsComponent;
