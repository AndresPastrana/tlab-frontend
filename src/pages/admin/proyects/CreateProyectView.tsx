import { useState } from "react";
import FormProject from "../../../components/admin/projects/FormProject";
import { CreateProjectData, CrumbItem } from "../../../types";
import { useProjects } from "../../../hooks/useProjects";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import Breadcrumbs from "../../../components/shared/Breadcrumbs";

const items: CrumbItem[] = [
  { label: "Home", href: "/admin" },
  { label: "Proyectos", href: "/admin/proyectos" },
  { label: "Crear nuevo proyecto" },
];

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
    <>
      <Breadcrumbs items={items} />
      <div className="px-3 py-5 bg-neutral-50 rounded-lg ">
        <h1 className="text-gray-700 font-medium pb-2 border-b w-fit mb-3 border-gray-400">
          Formulario del Proyecto de Tesis
        </h1>
        <FormProject onSubmit={handleSubmit}>
          <button
            disabled={loading}
            aria-disabled={loading}
            className={`basis-full btn sm:basis-3/12  my-auto mx-auto w-full bg-green-700 text-gray-100 max-w-xl hover:bg-green-800 ${
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
    </>
  );
};

export default CreateProyectView;
