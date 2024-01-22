import { useState, useEffect } from "react";
import StudentHistoryService from "../../../services/StudentService";
import { EvalHistory, StudentHistory } from "../../../types";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../utils/others";

type Style = { firstItem: string; secondItem: string };

const getTimeLineItemStyles = (index: number): Style => {
  const isImpar = (index + 1) % 2 !== 0;

  if (isImpar) {
    return {
      firstItem: "timeline-start timeline-box",
      secondItem: "timeline-end",
    };
  } else {
    return {
      firstItem: "timeline-end timeline-box",
      secondItem: "timeline-start",
    };
  }
};

const EvalTimeline = ({ evaluaciones }: { evaluaciones: EvalHistory[] }) => {
  return (
    <section className="flex flex-col sm:flex-row justify-start sm:items-center sm:justify-between gap-5 my-8">
      <h3 className=" text-base text-gray-800 font-medium border-b-2 pb-2 px-3">
        Evaluaciones{" "}
        <span className="text-sm text-gray-500 font-normal">
          (Linea de tiempo)
        </span>
      </h3>

      <ul className="timeline timeline-vertical">
        {evaluaciones.map((e, index) => {
          const { firstItem, secondItem } = getTimeLineItemStyles(index);
          const tooltipMessage = `Nota: ${e.score} pts br Recomendaciones: `;
          return (
            <li>
              <div
                className={`${firstItem} tooltip `}
                data-tip={tooltipMessage}
              >
                {e.type}
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className={secondItem}>
                <p className="text-sm text-gray-500">
                  Ultima Actualizacion:{" "}
                  <span className="text-gray-800 font-medium">
                    {formatDate(e.updatedAt)}
                  </span>
                </p>
              </div>

              <hr />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const HistoryHeader = () => {
  return <header>Historila de estudiante</header>;
};

const HistoryContent = () => {
  return;
};

const HistoryView = () => {
  const { id } = useParams<{ id: string }>();
  const [history, setHistory] = useState<StudentHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await StudentHistoryService.getStudentHistory(
          id as string
        );
        console.log(result);

        setHistory(result);
      } catch (error) {
        setError("Error fetching student history");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <main className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-md shadow-md mt-8  max-h-[70vh] min-h-[60vh] min-w-[50vw] scroll-smooth overflow-y-scroll overflow-x-hidden">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {history?.evaluaciones && (
        <EvalTimeline evaluaciones={history.evaluaciones} />
      )}
    </main>
  );
};

export default HistoryView;
