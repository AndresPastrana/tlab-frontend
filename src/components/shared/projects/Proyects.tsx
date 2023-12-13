import { Link } from "react-router-dom";
import { useProjects } from "../../../hooks/useProjects";
import { ProjectCards, ProjectsTable } from "./ProyectsTables";

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
    <>
      <ProjectCards projects={projects} />
      <ProjectsTable projects={projects} />
    </>
  );
};

export default Proyects;
