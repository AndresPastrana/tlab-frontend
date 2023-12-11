import { useState } from "react";
import FormProject from "../../../components/admin/projects/FormProject";
import { CreateProjectData } from "../../../types";
import { useProjects } from "../../../hooks/useProjects";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../components/shared/ErrorMessage";

const CreateProyectView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const { createNewProject } = useProjects();
  const handleSubmit = async (data: CreateProjectData) => {
    try {
      setError(null);
      setLoading(true);
      await createNewProject(data);
      setLoading(false);
      return navigate("/admin/proyectos");
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <FormProject onSubmit={handleSubmit}>
        <button
          disabled={loading}
          aria-disabled={loading}
          className={`btn w-full bg-green-700 text-gray-100 max-w-2xl hover:bg-green-800 ${
            loading ? "cursor-not-allowed" : ""
          }`}
          type="submit"
        >
          {loading ? "Creando proyecto..." : "Crear nuevo proyecto"}
        </button>
      </FormProject>
      {error && (
        <div className="flex justify-center font-bold">
          <ErrorMessage errors={error} />
        </div>
      )}
    </div>
  );
};

export default CreateProyectView;
