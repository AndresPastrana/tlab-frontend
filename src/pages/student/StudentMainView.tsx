import React from "react";

import ProyectInfo from "../../components/student/ProyectInfo";
import { useProjectInfo } from "../../hooks/useProjectInfo";
import { UserRole } from "../../const";

const StudentMainView: React.FC = () => {
  const { isLoading, projects } = useProjectInfo(true, UserRole.Student);

  return (
    <div>
      <h1>StudentMainView</h1>
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
