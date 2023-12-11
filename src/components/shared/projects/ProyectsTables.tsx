import { TesisProjectStatus } from "../../../const";
import { PopulatedTesisResponse } from "../../../types";

import {
  CheckIcon,
  ClockIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
const BadgeProjectStatus = ({
  projectStatus,
}: {
  projectStatus: TesisProjectStatus;
}) => {
  return (
    <span>
      {projectStatus === TesisProjectStatus.Pending && (
        <div className="badge badge-success gap-2 py-5 px-6 rounded-3xl bg-yellow-50 border-yellow-800 text-yellow-800">
          <span className="font-bold">Pendiente de Aprovacion</span>
          <ClockIcon className="w-7 h-7 ml-1" />
        </div>
      )}
      {projectStatus === TesisProjectStatus.Closed && (
        <div className="badge badge-success gap-2 py-4 px-3 rounded-3xl bg-red-50 border-red-800 text-red-800">
          <span className="font-bold">Proyecto Cerrado</span>
          <LockClosedIcon className="w-7 h-7 ml-1" />
        </div>
      )}
      {projectStatus === TesisProjectStatus.Approved && (
        <div className="badge badge-success gap-2 py-4 px-3 rounded-3xl bg-green-50 border-green-800 text-green-800">
          <span className="font-bold">Aprobado</span>
          <CheckIcon className="w-7 h-7 ml-1" />
        </div>
      )}
    </span>
  );
};

const ProjectCard = ({ project }: { project: PopulatedTesisResponse }) => {
  const {
    student,
    tutors,
    topic,
    general_target,
    scientific_problem,
    functional_requirements,
    status,
    ancient,
  } = project;

  return (
    <div className="card container mx-auto p-4 my-4  max-w-4xl rounded-lg bg-base-100 shadow-xl transition-transform transform hover:scale-105">
      <h2 className="text-lg font-bold mb-4">{topic}</h2>
      <p className="my-1">
        <span className="font-bold">Student:</span> {student.name}{" "}
        {student.lastname}
      </p>
      <p className="my-1">
        <span className="font-bold">Tutors:</span>{" "}
        {tutors.map((tutor) => `${tutor.name} ${tutor.lastname}`).join(", ")}
      </p>
      <p className="my-1">
        <span className="font-bold">General Target:</span> {general_target}
      </p>
      <p className="my-1">
        <span className="font-bold">Scientific Problem:</span>{" "}
        {scientific_problem}
      </p>
      <p className="my-1">
        <span className="font-bold mr-2">Status:</span>
        <BadgeProjectStatus projectStatus={status} />
      </p>
      <p className="my-1">
        <span className="font-bold">Proyecto Antiguo:</span>{" "}
        {ancient ? "Si" : "No"}
      </p>

      <h3 className="text-xl font-bold mt-4">Functional Requirements:</h3>
      {functional_requirements.length === 0 ? (
        <p className="text-red-800">
          Los requerimientos funcionales no han sido definidos.
        </p>
      ) : (
        <ul className="list-disc pl-6">
          {functional_requirements.map((requirement, index) => (
            <li key={`${index}${requirement.split(" ").join("-")}`}>
              {requirement}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Small screens
const ProjectCards = ({ projects }: { projects: PopulatedTesisResponse[] }) => {
  return (
    <div className="block md:hidden">
      <ul>
        {projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </ul>
    </div>
  );
};

//md screen sizes
const ProjectsTable = ({
  projects,
}: {
  projects: PopulatedTesisResponse[];
}) => (
  <table className="table hidden md:block min-w-full">
    <thead>
      <tr>
        <th>Topic</th>
        <th>Student</th>
        <th>Tutors</th>
        <th>General Target</th>
        <th>Scientific Problem</th>
        <th>Status</th>
        <th>Ancient</th>
      </tr>
    </thead>
    <tbody>
      {projects.map((project) => (
        <tr key={project.id}>
          <td>{project.topic}</td>
          <td>{`${project.student.name} ${project.student.lastname}`}</td>
          <td>
            {project.tutors
              .map((tutor) => `${tutor.name} ${tutor.lastname}`)
              .join(", ")}
          </td>
          <td>{project.general_target}</td>
          <td>{project.scientific_problem}</td>
          <td>
            <BadgeProjectStatus projectStatus={project.status} />
          </td>
          <td>{project.ancient ? "Yes" : "No"}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export { ProjectCards, ProjectsTable };
