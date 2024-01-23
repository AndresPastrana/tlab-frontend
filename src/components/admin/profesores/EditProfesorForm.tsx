import { useState } from "react";
import { FormEvent } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useProfessors } from "../../../hooks/useProfessors";
import { Profesor } from "../../../types";
import { validateProfesorData } from "../../../utils/validators";

import { RangoAcademico, Sex } from "../../../const";
import { SaveProfesor } from "./FormsButtons";
import ErrorMessage from "../../shared/ErrorMessage";

export const EditProfesorForm = () => {
  const { id: profesorId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const { getProfessorById, updateProfessor } = useProfessors();
  const profesorData = getProfessorById(profesorId as string) as Profesor;

  if (!profesorData) {
    return <h1>Profesor not found</h1>;
  }

  const hanldeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const newProfessor = {
      ci: formData.get("ci") as string,
      name: formData.get("name") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      sex: formData.get("sex") as Sex,
      categoria: formData.get("categoria") as string,
    };
    const { categoria, ...rest } = newProfessor;

    const validation = validateProfesorData(newProfessor);
    try {
      if (validation.isValid) {
        await updateProfessor(profesorId as string, {
          ...rest,
          academic_rank: categoria,
          user_id: profesorData.user_id,
        });
        navigate("/admin/personas/profesors");
      } else {
        setFieldErrors(validation.errors as Record<string, string[]>);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={hanldeSubmit}>
      <div className="flex flex-col my-8 gap-2">
        <h2 className="text-lg py-4 mb-5 border-b-[0.5px] border-b-neutral-300">
          Editar información del profesor
        </h2>
        {/* ci */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="min-w-[100px] text-neutral-500" htmlFor="ci">
              CI
            </label>
            <input
              defaultValue={profesorData.ci}
              name="ci"
              type="text"
              placeholder="Escriba el CI"
              className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
              aria-describedby="customer-error"
            />
          </div>
          <ErrorMessage errors={fieldErrors["ci"]} />
        </div>

        {/* Name  */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="min-w-[100px] text-neutral-500" htmlFor="name">
              Nombre
            </label>
            <input
              defaultValue={profesorData.name}
              name="name"
              type="text"
              placeholder="Escriba el nombre"
              className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
            />
          </div>
          <ErrorMessage errors={fieldErrors["name"]} />
        </div>

        {/* Apellidos */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label
              className="min-w-[100px] text-neutral-500"
              htmlFor="lastname"
            >
              Apellidos
            </label>
            <input
              required
              defaultValue={profesorData.lastname}
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Escriba el apellido"
              className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
            />
          </div>
          <ErrorMessage errors={fieldErrors["lastname"]} />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="min-w-[100px] text-neutral-500" htmlFor="email">
              Correo
            </label>
            <input
              defaultValue={profesorData.email}
              required
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
            />
          </div>
          <ErrorMessage errors={fieldErrors["email"]} />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="min-w-[100px] text-neutral-500" htmlFor="phone">
              Teléfono
            </label>
            <input
              defaultValue={profesorData.phone}
              required
              id="phone"
              name="phone"
              type="tel"
              placeholder="Escriba el número de teléfono"
              className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
            />
          </div>
          <ErrorMessage errors={fieldErrors["phone"]} />
        </div>

        {/* Address */}
        <div className="flex flex-col mb-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="min-w-[100px] text-neutral-500" htmlFor="address">
              Dirección
            </label>
            <input
              defaultValue={profesorData.address}
              required
              id="address"
              name="address"
              type="text"
              placeholder="Escriba la dirección"
              className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
            />
          </div>
          <ErrorMessage errors={fieldErrors["address"]} />
        </div>

        {/* Sex */}
        <div className="flex flex-col mb-2">
          <div className="flex flex-row sm:flex-row items-center gap-1">
            <label htmlFor="sex" className="sm:min-w-[100px]">
              Sexo
            </label>
            <span className="flex flex-row items-center gap-1">
              <label className="text-neutral-500" htmlFor="male">
                Masculino
              </label>
              <input
                checked={profesorData.sex === Sex.Male}
                id="male"
                name="sex"
                value={Sex.Male}
                type="radio"
                className="radio"
                aria-label="Masculino"
              />
            </span>

            <span className="flex flex-row items-center gap-1">
              <label className="text-neutral-500" htmlFor="female">
                Femenino
              </label>
              <input
                checked={profesorData.sex === Sex.Female}
                id="female"
                name="sex"
                value={Sex.Female}
                type="radio"
                className="radio"
                aria-label="Femenino"
              />
            </span>
          </div>
          <ErrorMessage errors={fieldErrors["sex"]} />
        </div>
        {/* Categoria */}
        <div>
          <div className="flex flex-col mb-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label
                className="min-w-[100px] text-neutral-500"
                htmlFor="categoria"
              >
                Categoria
              </label>
              <select
                defaultValue={profesorData.academic_rank.id}
                name="categoria"
                id="categoria"
                className="select select-bordered w-full  focus:outline-green-700 focus:outline-2 focus:border-none  max-w-full sm:max-w-lg"
              >
                <option disabled defaultChecked>
                  Seleciona la Categoria Cientifica
                </option>
                {Object.values(RangoAcademico).map((r) => {
                  return (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  );
                })}
              </select>
            </div>

            <ErrorMessage errors={fieldErrors["categoria"]} />
          </div>
          {/* <p className="text-sm text-red-500">{state?.message}</p> */}
        </div>
        <SaveProfesor isLoading={isLoading} />
      </div>
    </form>
  );
};
