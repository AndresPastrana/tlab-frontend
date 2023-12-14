import { useEvaluations } from "../../../hooks/useEvaluaciones";
import { useEvaluationsFilters } from "../../../context/EvaluationFilterContext";
import { useState } from "react";
import { Modal } from "../../../components/shared/Dialog";
import EvaluacionesTables from "../../../components/admin/evaluaciones/EvaluacionesTables";
import { Header } from "../../../components/admin/evaluaciones/Header";
import SearchResultsBadge from "../../../components/admin/evaluaciones/SearchResultsBadge";
import { FormEvaluation } from "../../../components/admin/evaluaciones/FormEvaluation";
import { Evaluation } from "../../../types";
import { toast } from "sonner";

interface CreateEvaluationBTNProps {
  onClick: () => void;
}

const CreateEvaluationBTN: React.FC<CreateEvaluationBTNProps> = ({
  onClick,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Create Evaluation
      </button>
    </div>
  );
};

const Evaluaciones = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeEvaluation, setActiveEvaluation] = useState<Evaluation | null>(
    null
  );

  const reset = () => {
    setActiveEvaluation(null);
    setIsDialogOpen(false);
  };

  const handleCreateEval = () => {
    setIsDialogOpen(true);
  };

  const onModalClose = () => {
    setActiveEvaluation(null);
    setIsDialogOpen(false);
  };

  const saveEvaluation = async (data: FormData) => {
    const newEval: Partial<Evaluation> = {
      description: data.get("description"),
      endDate: data.get("endDate"),
      status: data.get("status"),
      type: data.get("type"),
    };

    try {
      await createEvaluation(newEval);
      reset();
    } catch (err) {
      toast.error("Error al crear la nueva evaluacion");
    }
  };

  const {
    evaluations: allEvaluations,
    createEvaluation,
    isLoading,
    isError,
    error,
  } = useEvaluations();

  const { filters } = useEvaluationsFilters();
  console.log(filters);

  const evaluations = allEvaluations.filter(
    (evaluation) =>
      (!filters.status || evaluation.status === filters.status) &&
      (!filters.type || evaluation.type === filters.type)
  );

  const results = evaluations.length >= 1 ? evaluations : allEvaluations;

  return (
    <>
      {isLoading && <p>Loading evaluations...</p>}
      {isError && <p>Error loading evaluations: {error.message}</p>}
      <Header />

      <SearchResultsBadge
        results={evaluations.length}
        total={allEvaluations.length}
      />
      <EvaluacionesTables evaluations={results} />
      <CreateEvaluationBTN onClick={handleCreateEval} />

      <Modal open={isDialogOpen} onClose={onModalClose} hasCloseBtn>
        {/*TODO:  Create a form to create a new evaluation */}
        <FormEvaluation
          evaluation={activeEvaluation}
          onSubmit={saveEvaluation}
        />
        {/* This for will be the same for editing, so it will have default values in case that recives a evaluation.This form will also recive the action to execute when submit */}
      </Modal>
    </>
  );
};

export default Evaluaciones;
