import { FormEvent, useState } from "react";

import { useProfessors } from "../../../hooks/useProfessors";
import { SaveProfesor } from "./FormsButtons";
import { Sex } from "../../../const";
import { useNavigate } from "react-router-dom";
import { validateProfesorData } from "../../../utils/validators";
import ErrorMessage from "../../shared/ErrorMessage";
import useAcademicRank from "../../../hooks/useAcademicRank";
import { capitalizeFirstLetterOfEachWord } from "../../../utils/others";

export const CreateProfessorForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { createProfessor } = useProfessors();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

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

    try {
      // Validate the data before attempting to create the professor
      const validation = validateProfesorData(newProfessor);

      if (validation.isValid) {
        await createProfessor({
          ...rest,
          academic_rank: categoria,
        });

        navigate("/admin/personas/profesors");
      } else {
        // Data is invalid, set the field errors for display
        setFieldErrors(validation.errors as Record<string, string[]>);
      }
      // Insert the new professor using the createProfessor function
    } catch (error) {
      console.error("Failed to create professor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { academicRanks } = useAcademicRank();
  return (
    <form onSubmit={hanldeSubmit}>
      <div className="flex flex-col  my-8 gap-2">
        <h2 className="text-lg py-4 mb-5 border-b-[0.5px] border-b-neutral-300">
          Ingresa la infomacion del profesor
        </h2>
        {/* CI */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="min-w-[100px] text-neutral-500" htmlFor="ci">
              CI
            </label>
            <input
              id="ci"
              type="text"
              name="ci"
              required
              placeholder="Escriba el CI"
              className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
              aria-describedby="customer-error"
            />
          </div>

          {/* Check for an error */}
          <ErrorMessage errors={fieldErrors["ci"]} />
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="min-w-[100px] text-neutral-500" htmlFor="name">
              Nombre
            </label>

            <input
              id="name"
              type="text"
              required
              name="name"
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
                id="female"
                name="sex"
                value={Sex.Female}
                type="radio"
                className="radio"
                aria-label="Femenino"
              />
            </span>
          </div>
          {/* <ErrorMessage errors={state.errors?.sex} /> */}
        </div>

        <div>
          <div className="flex flex-col mb-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label
                className="min-w-[100px] text-neutral-500"
                htmlFor="categoria"
              >
                Categoria Docente
              </label>
              <select
                name="categoria"
                id="categoria"
                className="select select-bordered w-full  focus:outline-green-700 focus:outline-2 focus:border-none  max-w-full sm:max-w-lg"
              >
                <option disabled defaultChecked>
                  Seleciona la Categoria Docente
                </option>

                {academicRanks &&
                  academicRanks?.length >= 1 &&
                  academicRanks.map((r) => {
                    return (
                      <option key={r.id} value={r.id}>
                        {capitalizeFirstLetterOfEachWord(r.rank)}
                      </option>
                    );
                  })}
              </select>
            </div>

            <ErrorMessage errors={fieldErrors["categoria"]} />
          </div>
          {/* <p className="text-sm text-red-500">{state?.message}</p> */}
        </div>
      </div>
      <SaveProfesor isLoading={isLoading} />
    </form>
  );
};
