import { useState, useEffect } from "react";
import StudentHistoryService from "../../../services/StudentService";
import { StudentHistory } from "../../../types";
import { useParams } from "react-router-dom";

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
    <div className="max-w-xl mx-auto p-4 bg-gray-100 rounded-md shadow-md mt-8">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {history && (
        <div>
          <h2 className="text-xl font-bold mb-4">Student History</h2>
          <ul>
            {history.evaluaciones.map((evaluacion, index) => (
              <li key={index} className="mb-2">
                <p>Type: {evaluacion.type}</p>
                <p>Updated At: {evaluacion.updatedAt.toString()}</p>
                <p>
                  Score: {evaluacion.score !== null ? evaluacion.score : "N/A"}
                </p>
                <p>
                  File: {evaluacion.file !== null ? evaluacion.file : "N/A"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
