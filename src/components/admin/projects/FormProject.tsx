import React, { FormEvent, ReactElement } from "react";
import SelectStudent from "../../shared/students/SelectStudent";
import SelectProfessors from "../../shared/professors/SelectProfessors";
import { CreateProjectData } from "../../../types";

interface FormProjectProps {
  onSubmit: (formData: CreateProjectData) => Promise<void>;
  children: ReactElement<HTMLButtonElement>;
}

const FormProject: React.FC<FormProjectProps> = ({ onSubmit, children }) => {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // Extract form data

    const student = data.get("selectedStudent") as string;
    const tutors = Array.from(data.getAll("selectedProfessors")) as string[];

    const formDataValues: CreateProjectData = {
      topic: data.get("topic") as string,
      general_target: data.get("general_target") as string,
      scientific_problem: data.get("scientific_problem") as string,
    };

    if (student) {
      formDataValues.student = student;
    }

    if (tutors.length >= 1) {
      formDataValues.tutors = tutors;
    }

    // Call the onSubmit function with the extracted form data
    onSubmit(formDataValues);
  };

  return (
    <div>
      <form onSubmit={submit}>
        {/* Topic of the project */}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Titulo del proyecto</span>
          </div>
          <textarea
            required
            minLength={10}
            name="topic"
            maxLength={200}
            className="resize-none textarea textarea-bordered h-24 max-w-2xl"
            placeholder="Titulo"
          ></textarea>
          <div className="label">
            <span className="label-text-alt">Titulo</span>
          </div>
        </label>
        <br />
        {/* general_target of the project */}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Objetivo general del proyecto</span>
          </div>
          <textarea
            name="general_target"
            minLength={10}
            maxLength={200}
            className="resize-none textarea textarea-bordered h-32 max-w-2xl"
            placeholder="Objetivo..."
          ></textarea>
          <div className="label">
            <span className="label-text-alt">Objetivo</span>
          </div>
        </label>
        <br />
        {/* scientific_problem */}
        <label className="form-control">
          <div className="label">
            <span className="label-text">
              Problema cientifico que estudia el proyecto
            </span>
          </div>
          <textarea
            name="scientific_problem"
            minLength={20}
            maxLength={500}
            className="resize-none textarea textarea-bordered h-32 max-w-2xl"
            placeholder=" Problema cientifico ..."
          ></textarea>
          <div className="label">
            <span className="label-text-alt">Problema cientifico</span>
          </div>
        </label>
        <br />

        {/* SelectStudent component */}
        <SelectStudent />

        <br />
        {/* SelectProfessors component */}
        <SelectProfessors />

        <br />

        {children}
      </form>
    </div>
  );
};

export default FormProject;
