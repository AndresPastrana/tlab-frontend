import { FC } from "react";
import { EvalStatus, EvalType, Evaluation } from "../../../types.d";

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
    // TODO: Reset form fileds ehre
    // Reset the form fields
    e.currentTarget.reset();
    console.log("Form fields reset");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="label" htmlFor="description">
          Description
        </label>
        <input
          required
          id="description"
          name="description"
          className="input input-bordered"
          type="text"
          defaultValue={evaluation?.description}
        />
      </div>

      <div className="flex justify-between">
        <label className="label" htmlFor="type">
          Tipo :
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

      <div className="flex justify-between">
        <label className="label" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="input"
          defaultValue={evaluation?.status || EvalStatus.Open}
        >
          <option value={EvalStatus.Open}>Abierta</option>
          <option value={EvalStatus.Close}>Cerrada</option>
          {/* Add other EvalStatus options as needed */}
        </select>
      </div>

      <div className="flex justify-between">
        <label className="label" htmlFor="endDate">
          End Date
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

      {/* Add more fields based on your Evaluation type definition */}
      <button
        type="submit"
        className="mt-10 btn bg-green-600 text-gray-50 hover:bg-green-800"
      >
        Submit
      </button>
    </form>
  );
};
