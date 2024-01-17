import React from "react";
import useSWR from "swr";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ApiResponse } from "../../../types";
import SubissionService from "../../../services/SubmissionService";

interface PersonInfo {
  id: string;
  name: string;
  lastname: string;
}

interface Submission {
  id: string;
  evaluation_id: string;
  student: PersonInfo;
  file: string;
  score: number | null;
  recoms: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const fetcher = async (url: string, token: string) => {
  try {
    const response = await axios.get<ApiResponse<Submission[]>>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const EvalSubmissions: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { token } = useAuth();
  const apiUrl = `${import.meta.env.VITE_API}${
    import.meta.env.VITE_EVALUACIONES
  }/${id}/submissions`;

  const { data, error, mutate } = useSWR(
    apiUrl,
    () => fetcher(apiUrl, token as string),
    {
      revalidateOnFocus: true,
    }
  );

  // This method will recive the submition id the recoms and the socre
  const handleEvalSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const id = formData.get("id") as string;
      formData.delete("id");

      await SubissionService.editSubmision(id, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return (
      <div className="text-red-600">Error loading submissions: {error}</div>
    );
  }

  if (!data) {
    return <div className="text-gray-600">Loading submissions...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">
        Submissions for Evaluation {id}
      </h1>
      {data.success ? (
        <ul>
          {data.data.map((submission) => (
            <li key={submission.id} className="border p-4 mb-4 rounded-md">
              <p className="text-lg font-semibold mb-2">
                Envio de : {submission.student.name}{" "}
                {submission.student.lastname}
              </p>

              <p>
                Archivo enviado:{" "}
                <Link
                  to={submission.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link text-blue-600 hover:text-blue-800"
                >
                  {submission.file}
                </Link>
              </p>

              <div>
                {submission.score !== null && (
                  <p className="text-lg">Puntuación: {submission.score}</p>
                )}
                {submission.recoms !== null && (
                  <p className="text-lg">
                    Recomendaciones: {submission.recoms}
                  </p>
                )}
              </div>

              {/* Show the form to eval */}
              {submission.score === null && submission.recoms === null && (
                <form onSubmit={handleEvalSubmission}>
                  <input
                    type="text"
                    name="id"
                    defaultValue={submission.id}
                    className="hidden"
                  />
                  <div>
                    <label htmlFor="score">Puntuacion: </label>
                    <input
                      id="score"
                      name="score"
                      required={true}
                      max={5}
                      min={2}
                      type="number"
                      defaultValue={submission?.score || 0}
                      className="input input-bordered w-16"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="recoms">Recomendaciones: </label>
                    <textarea
                      minLength={11}
                      id="recoms"
                      name="recoms"
                      required={true}
                      defaultValue={submission?.recoms || ""}
                      className="textarea input-bordered"
                    />
                  </div>
                  {/* TODO: Botón para realizar una evaluación */}
                  <button
                    type="submit"
                    className="btn bg-green-600 text-gray-50 hover:bg-green-800 px-10 my-3"
                  >
                    Evaluar
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-600">{data.msg}</p>
      )}
    </div>
  );
};
