import { Link } from "react-router-dom";
import { useStudentsEvaluations } from "../../hooks/useStudentEvaluations";
import { ClockIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface SubmissionDateProps {
  date: Date;
}

interface EvaluationDescriptionProps {
  description: string;
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
          <div className=" flex  items-center justify-between mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Detalles de la evaluacion
            </h2>
            <SubmissionDate date={evaluation.endDate} />
          </div>

          {/* <p>ID: {evaluation.id}</p> */}
          <p>
            <span className="font-medium">Tipo de evaluacion:</span>{" "}
            {evaluation.type.toLocaleUpperCase()}
          </p>
          <EvaluationDescription description={evaluation.description} />
          {/* <p>Status: {evaluation.status}</p> */}
          {/* Add other evaluation details as needed */}

          {submission ? (
            <div className="mt-4 p-4 bg-gray-200 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Detalles del envio</h2>
              {/* Existing submission details */}
              <div>
                <p>
                  Arhcivo:
                  <Link
                    className="ml-3 btn-link text-blue-600 hover:text-blue-700"
                    to={submission.file}
                  >
                    {submission.file}
                  </Link>
                </p>
                <p>Score: {submission.score}</p>
                <p>Recommendations: {submission.recoms}</p>
              </div>
              {/* Edit file input for existing submission */}
              <div className="mt-4">
                <div>
                  <label
                    htmlFor={`editSubmissionFile-${submission.id}`}
                    className="block"
                  >
                    Editar archivo de envio:
                  </label>
                  <input
                    type="file"
                    id={`editSubmissionFile-${submission.id}`}
                    // onChange={handleFileChange}
                    className="mt-2 file-input"
                  />
                </div>

                <button
                  // onClick={() => handleEditSubmissionFile(submission.id)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Guardar archivo
                </button>
              </div>
            </div>
          ) : (
            // Render input for new submission
            <div className="mt-4 p-4  rounded-md">
              <h2 className="text-xl font-semibold mb-2">New Submission</h2>
              <div>
                <div>
                  <label htmlFor="newSubmissionFile" className="block">
                    Agrega un nuveo archio a la evaluacion:
                  </label>
                  <input
                    type="file"
                    id="newSubmissionFile"
                    // onChange={handleFileChange}
                    className="mt-2  file-input"
                  />
                </div>
                <button
                  // onClick={handleUploadSubmission}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Upload Submission
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentsEvaluationsComponent;
