import React, { useMemo, useState } from "react";

import ProyectInfo from "../../components/student/ProyectInfo";
import { useProjectInfo } from "../../hooks/useProjectInfo";
import { CrumbItem } from "../../types";
import Breadcrumbs from "../../components/shared/Breadcrumbs";
import SearchBar from "../../components/shared/SearchBar";
import { useSearchParams } from "react-router-dom";
import { escapeRegExp } from "../../utils/regExp";

const ProfessorView: React.FC = () => {
  const items: CrumbItem[] = [
    { label: "Home", href: "/profesors" },
    { label: "Proyectos" },
  ];

  // Read the query param from the URL
  const [params] = useSearchParams();

  const queryParam = params.get("query") || "";

  // State for search query
  const [searchTearm, setSearchQuery] = useState(queryParam);

  const { isLoading, projects, aproveProject } = useProjectInfo(true);

  const filteredProjects = useMemo(() => {
    if (Array.isArray(projects)) {
      //Return all the projects if the search term is an empty string
      if (searchTearm === "") {
        return projects;
      }

      const regExp = new RegExp(escapeRegExp(searchTearm), "i");
      const matchedProjects = projects.filter((project) => {
        return (
          regExp.test(project.student.name) ||
          regExp.test(project.student.lastname) ||
          regExp.test(project.functional_requirements.join(", ")) ||
          regExp.test(project.scientific_problem) ||
          regExp.test(project.general_target)
        );
      });

      return matchedProjects;
    } else {
      return [];
    }
  }, [searchTearm, projects]);

  return (
    <div>
      <Breadcrumbs items={items} />
      <SearchBar
        placeholder="escribe para buscar a un proyecto"
        onSearch={(query) => setSearchQuery(query)}
      />
      {/* Render projects information in case it is an array of projects*/}
      {isLoading
        ? "Loading...."
        : Array.isArray(projects) && (
            <div className="flex flex-col gap-2">
              {filteredProjects.map((project) => (
                <ProyectInfo
                  aproveProject={aproveProject}
                  key={project.id}
                  proyect={project}
                />
              ))}
            </div>
          )}
    </div>
  );
};

export default ProfessorView;
