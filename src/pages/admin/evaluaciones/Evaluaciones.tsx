import { useEvaluations } from "../../../hooks/useEvaluaciones";
import { useEvaluationsFilters } from "../../../context/EvaluationFilterContext";
import { ReactElement, useState } from "react";
import { Modal } from "../../../components/shared/Dialog";
import EvaluacionesTables from "../../../components/admin/evaluaciones/EvaluacionesTables";
import { Header } from "../../../components/admin/evaluaciones/Header";
import SearchResultsBadge from "../../../components/admin/evaluaciones/SearchResultsBadge";
import { FormEvaluation } from "../../../components/admin/evaluaciones/FormEvaluation";
import { CrumbItem, Evaluation } from "../../../types";
import { EvalStatus } from "../../../const";
import { toast } from "sonner";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Breadcrumbs from "../../../components/shared/Breadcrumbs";

interface ReusableButtonProps {
  onClick: () => void;
  className?: string;
  buttonText?: string;
  Icon?: ReactElement; // Change to the specific ReactElement type for the icon
}

export const ReusableButton: React.FC<ReusableButtonProps> = ({
  onClick,
  className = "",
  buttonText = "Create Evaluation",
  Icon,
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={onClick}
        className={`bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4 ${className} flex items-center justify-between`}
      >
        {buttonText}
        {Icon && <span className="ml-4 ">{Icon}</span>}
      </button>
    </div>
  );
};

const Evaluaciones = () => {
  const {
    evaluations: allEvaluations,
    createEvaluation,
    isLoading,
    isError,
    error,
    editEvaluation,
  } = useEvaluations();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeEvaluation, setActiveEvaluation] = useState<Evaluation | null>(
    null
  );

  const { filters } = useEvaluationsFilters();

  const evaluations = allEvaluations.filter(
    (evaluation) =>
      (!filters.status || evaluation.status === filters.status) &&
      (!filters.type || evaluation.type === filters.type)
  );

  const results = evaluations.length >= 1 ? evaluations : allEvaluations;

  const reset = () => {
    setActiveEvaluation(null);
    setIsDialogOpen(false);
  };

  const handleCreateEval = () => {
    setIsDialogOpen(true);
  };

  const setEditMode = (id: string) => {
    const activeEval = allEvaluations.find((e) => e.id === id);

    if (activeEval && activeEval.status === EvalStatus.Open) {
      setActiveEvaluation(activeEval);
      setIsDialogOpen(true);
      return;
    }

    if (activeEval && activeEval.status === EvalStatus.Close) {
      toast.error("No puedes editar una evaluacion que ya ha sido cerrada");
      return;
    }
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

  const saveEditeEvaluation = async (data: FormData) => {
    const newEval: Partial<Evaluation> = {
      description: data.get("description"),
      endDate: data.get("endDate"),
      status: data.get("status"),
      type: data.get("type"),
    };

    try {
      if (activeEvaluation?.id) {
        await editEvaluation(newEval, activeEvaluation.id);
        return reset();
      }
    } catch (err) {
      toast.error("Error al crear la nueva evaluacion");
    }
  };

  const items: CrumbItem[] = [
    { label: "Home", href: "/admin" },
    { label: "Evaluaciones" },
  ];

  return (
    <div className="min-h-[80vh]">
      <Breadcrumbs items={items} />
      {isLoading && <p>Loading evaluations...</p>}
      {isError && <p>Error loading evaluations: {error.message}</p>}
      <Header />

      <div className="max-w-5xl">
        <SearchResultsBadge
          results={evaluations.length}
          total={allEvaluations.length}
        />
        <EvaluacionesTables
          handleSetEditMode={setEditMode}
          evaluations={results}
        />
        <ReusableButton
          onClick={handleCreateEval}
          Icon={
            <ArrowUpRightIcon className="w-4 h-4 text-white-200 font-bold" />
          }
        />
      </div>

      <Modal open={isDialogOpen} onClose={onModalClose} hasCloseBtn>
        {/*TODO:  Create a form to create a new evaluation */}
        <FormEvaluation
          evaluation={activeEvaluation}
          onSubmit={activeEvaluation ? saveEditeEvaluation : saveEvaluation}
        />
        {/* This for will be the same for editing, so it will have default values in case that recives a evaluation.This form will also recive the action to execute when submit */}
      </Modal>
    </div>
  );
};

export default Evaluaciones;
