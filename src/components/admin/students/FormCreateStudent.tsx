import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "./FormsButtons";
import ErrorMessage from "../../shared/ErrorMessage";
import { useStudents } from "../../../hooks/useStudents";
import { Student } from "../../../types";
import { Sex } from "../../../const";

import { validateStudentData } from "../../../utils/validators";

export const FormCreateStudent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const { createStudent } = useStudents();

  const hanldeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    // const data = Array.from(formData.entries())
    const newStudent = {
      ci: formData.get("ci") as string,
      name: formData.get("name") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      sex: formData.get("sex") as Sex,
      language_certificate:
        formData.get("language_certificate") === "on" ? true : false,
      user_id: "",
    };

    const validation = validateStudentData(newStudent);
    try {
      if (validation.isValid) {
        const { user_id, ...rest } = validation.data;
        await createStudent(rest as Student);
        navigate("/admin/personas/students");
      } else {
        setFieldErrors(validation.errors as Record<string, string[]>);
      }
    } catch (error) {
      // TODO: set other type of error here
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={hanldeSubmit}>
      <div className="flex flex-col my-8 gap-2">
        <h2 className="text-lg py-4 mb-5 border-b-[0.5px] border-b-neutral-300">
          Ingresa la informacion del nuevo estudiante
        </h2>
        {/* ci */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <label className="min-w-[100px] text-neutral-500" htmlFor="ci">
              CI
            </label>
            <input
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
            <label
              htmlFor="sex"
              className="sm:min-w-[100px] mr-4 text-gray-500"
            >
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
          <ErrorMessage errors={fieldErrors["sex"]} />
        </div>

        {/*Language certificated  */}
        <div className="form-control">
          <label className="cursor-pointer label p-0 h-[48px] flex flex-row justify-start">
            <span className="label-text text-base text-gray-500 sm:mr-44 mr-28 ">
              Ingles Certificado
            </span>
            <input
              name="language_certificate"
              type="checkbox"
              className="checkbox border-green-500 checked:border-green-500 [--chkbg:theme(colors.green.100)] [--chkfg:green]"
            />
          </label>
        </div>
        {/* Certificacion de idioma */}
        <Save isLoading={isLoading} />
      </div>
    </form>
  );
};
