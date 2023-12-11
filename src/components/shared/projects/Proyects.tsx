import { useProjects } from "../../../hooks/useProjects";
import { ProjectCards, ProjectsTable } from "./ProyectsTables";

const Proyects = () => {
  const { projects, isLoading, error } = useProjects();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20">
        <span className="loading loading-spinner text-success "></span>
      </div>
    );
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
