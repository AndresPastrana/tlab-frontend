import { Link } from "react-router-dom";
import { useProjects } from "../../../hooks/useProjects";
import { ProjectCards, ProjectsTable } from "./ProyectsTables";
import { generateProjectsReports } from "../../../utils/helpers";
import {
  ArrowUpRightIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/solid";
import { PopulatedTesisResponse } from "../../../types";

export const Header = ({ project }: { project: PopulatedTesisResponse[] }) => {
  return (
    <div className=" flex items-center justify-between mt-5 bg-gray-100 px-3 py-5 rounded-md mb-4">
      <h1 className="text-gray-700 font-medium pb-2 border-b w-fit mb-3 text-lg border-gray-400">
        Proyectos de Tesis
      </h1>

      <div className="flex items-center">
        <button
          onClick={() => generateProjectsReports(project)}
          className="btn btn-ghost btn-sm  flex  items-center "
        >
          <span>Obtener Reporte</span>
          <span>
            <DocumentArrowDownIcon className="w-4 h-4" />
          </span>
        </button>

        <Link to="/admin/proyectos/create">
          <button className="btn btn-ghost btn-sm flex items-center">
            Crear Proyecto
            <ArrowUpRightIcon className="w-4 h4" />
          </button>
          {/* <ReusableButton
            buttonText="Crear nuevo proyecto"
            onClick={() => {}}
            Icon={<ArrowUpRightIcon className="text-gray-50 w-4 h-4" />}
          /> */}
        </Link>
      </div>
    </div>
  );
};

const EmptyProjectsMessage = () => {
  return (
    <div className="flex font-normal  text-sm sm:text-base items-center justify-center h-48 my-20">
      <p className="text-gray-600 text-center">
        No existen proyectos activos actualmente, haga click{" "}
        <Link
          className="text-green-800 border-b pb-1"
          to={"/admin/proyectos/create"}
        >
          aqui
        </Link>{" "}
        para agregar uno nuevo
      </p>
    </div>
  );
};

const Proyects = () => {
  const { projects, isLoading, error } = useProjects();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20">
        <span className="loading loading-spinner text-success "></span>
      </div>
    );
  }

  if (!isLoading && !error && projects.length === 0) {
    return <EmptyProjectsMessage />;
  }

  if (error) {
    return <p>Error fetching projects: {error.message}</p>;
  }

  return (
    <div className="border rounded-md px-3 py-2">
      <Header project={projects} />
      <ProjectCards projects={projects} />
      <ProjectsTable projects={projects} />
    </div>
  );
};

export default Proyects;
