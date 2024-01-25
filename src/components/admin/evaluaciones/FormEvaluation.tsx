import { FC } from "react";
import { EvalStatus, EvalType, Evaluation } from "../../../types.d";
import { Link } from "react-router-dom";

interface EvaluationForm {
  evaluation: Evaluation | null;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const FormEvaluation: FC<EvaluationForm> = ({
  evaluation = null,
  onSubmit,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit(data);
    e.currentTarget.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col"
      encType="multipart/form-data"
    >
      <h1 className="text-gray-900 text-xl font-medium">
        {evaluation ? "Editando evaluacion" : "Creando nueva evaluacion"}
      </h1>
      <br className="divider" />
      <div>
        <label className="label" htmlFor="description">
          Descripcion
        </label>
        <textarea
          placeholder="Escribe un parrafo donde le describas a los estudiantes la tarea a realizar"
          rows={2}
          required
          id="description"
          name="description"
          className="textarea input-bordered w-full"
          defaultValue={evaluation?.description}
        />
      </div>
      <div className="divider"></div>
      <div className="flex justify-between">
        <label className="label" htmlFor="type">
          Tipo:{" "}
          <span className="ml-1 text-gray-500 text-sm">
            {" "}
            (Indique si es una Predefensa o un Corte Evaluativo)
          </span>
        </label>
        <select
          id="type"
          name="type"
          required
          className="input input-ghost"
          defaultValue={evaluation?.type || EvalType.CorteEvaluativo}
        >
          <option value={EvalType.CorteEvaluativo}>Corte Evaluativo</option>
          <option value={EvalType.Predefensa}>Predefensa</option>
          {/* Add other EvalType options as needed */}
        </select>
      </div>
      <div className="divider"></div>
      {/* Recursos */}
      <div className="flex flex-col">
        <label className="label" htmlFor="recurso">
          Recursos:{" "}
          <span className="ml-1 text-gray-500 text-sm">
            (Archivo de recursos asociados a una evaluacion)
          </span>
        </label>
        <input
          type="file"
          id="recurso"
          name="recurso"
          className="input file-input file-input-md file-input-bordered max-w-sm m-0 p-0"
        />
        {evaluation?.resourcesFile && (
          <Link
            className="ml-auto link link-primary cursor-pointer"
            to={evaluation.resourcesFile}
          >
            Archivo Subido Anteriormente
          </Link>
        )}
      </div>
      <div className="divider"></div>
      <div className="flex justify-between">
        <label className="label" htmlFor="status">
          Estado :
          <span className="ml-1 text-gray-500 text-sm">
            {" "}
            (Abierta por defecto)
          </span>
        </label>
        <select
          id="status"
          name="status"
          className="input"
          defaultValue={evaluation?.status || EvalStatus.Open}
        >
          <option value={EvalStatus.Open}>Abierta</option>

          <option disabled={!evaluation?.status} value={EvalStatus.Close}>
            Cerrada
          </option>
          {/* Add other EvalStatus options as needed */}
        </select>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between">
        <label className="label" htmlFor="endDate">
          Enviar antes de :{" "}
          <span className="ml-1 text-gray-500 text-sm">
            {" "}
            (Fecha antes de la cual el estudiante debe realizar el envio)
          </span>{" "}
        </label>
        <input
          required
          id="endDate"
          name="endDate"
          className="input"
          type="date"
          defaultValue={(evaluation?.endDate.split("T")[0] as string) || ""}
        />
      </div>
      <div className="divider"></div>

      {/* Add more fields based on your Evaluation type definition */}
      <button
        type="submit"
        className="mt-10 btn bg-green-600 text-gray-50 hover:bg-green-800"
      >
        Guardar
      </button>
    </form>
  );
};
