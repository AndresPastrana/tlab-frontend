import React from "react";

import ProyectInfo from "../../components/student/ProyectInfo";
import { useProjectInfo } from "../../hooks/useProjectInfo";

const StudentMainView: React.FC = () => {
  const { isLoading, projects } = useProjectInfo(true);

  return (
    <div>
      {isLoading && "Loading"}
      {!Array.isArray(projects) && <ProyectInfo proyect={projects} />}

      {/* Render projects information in case it is an array of projects*/}
      {Array.isArray(projects) && (
        <div>
          {projects.map((project) => (
            <ProyectInfo key={project.id} proyect={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMainView;
