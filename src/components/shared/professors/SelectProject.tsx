import { useProjects } from "../../../hooks/useProjects";

const SelectProject = () => {
  const { projects, isLoading, isError } = useProjects();

  const options = projects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.topic}
    </option>
  ));

  // Placeholder text for the Select component
  const placeholder = "Selecciona un proyecto";

  return (
    <div>
      {isLoading && <p>Cargando proyectos...</p>}
      {isError && <p>Error cargando proyectos</p>}
      {!isLoading && !isError && (
        <select required name="project" className="select w-full">
          <option value="" disabled={true} selected>
            {placeholder}
          </option>
          {options}
        </select>
      )}
    </div>
  );
};

export default SelectProject;
